/*
 * cli.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict;";

var path = require('path');
var utils = require('./utils');
var colored = utils.safe_colored;

function OptionGroup(name) {
    this.name = name;
    this.description = undefined;
    this.extra = undefined;
    this.options = {
        'string': {},
        'boolean': {},
        'alias': {},
        'default': {},
        'choices': {},
    };

    this.help = {};
    this.seen = {};
}

var groups = {}, group;

function create_group(name, usage, description, extra) {
    group = new OptionGroup(name);
    var match = utils.comment_contents.exec(description.toString());
    if (!match) {
        throw new TypeError('Multiline comment missing for: ' + name);
    }
    group.description = match[1];
    group.usage = name + ' [options] ' + usage;
    groups[name] = group;

    if (extra) {
        match = utils.comment_contents.exec(extra.toString());
        if (match) group.extra = match[1];
    }

opt('help', 'h', 'bool', false, function(){/*
show this help message and exit
*/});

opt('version', 'V', 'bool', false, function(){/*
show the version and exit
*/});


}

var COL1 = 'yellow', COL2 = 'green';

function print_usage(group) {  // {{{
	var COL_WIDTH = 79;
	var OPT_WIDTH = 23;

    usage = (group) ? group.usage :  "[sub-command] ...";
	console.log(colored('Usage:', COL1), colored(path.basename(process.argv[1]), COL2), usage, '\n');
    if (!group) {
        // Overall usage
        help = ('RapydScript can perform many actions, depending on which' + 
                '\nsub-command is invoked. With no arguments, it will start a REPL,' +
                '\nunless STDIN is a pipe, in which case it will compile whatever' + 
                '\nyou pass on STDIN and write the output to STDOUT. See the full' +
                '\nlist of sub-commands below.');
        console.log(help, '\n');
        console.log(colored('Sub-commands:', COL1));
        Object.keys(groups).forEach(function (name) {
            console.log();
            var dt = utils.wrap(groups[name].description.split('\n'), COL_WIDTH - OPT_WIDTH);
            console.log(colored((name + utils.repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), COL2), dt[0]);
            dt.slice(1).forEach(function (line) {
                console.log(utils.repeat(' ', OPT_WIDTH), line);
            });
        });
        return;
    }

    // Group specific usage

    console.log(group.description);
    if (group.extra) console.log('\n' + group.extra);
	console.log(colored('\nOptions:', COL1));
    var options = group.options;
    var help = group.help;

	Object.getOwnPropertyNames(options.alias).forEach(function (name) {
		var optstr = '  --' + name.replace('_', '-');
		options.alias[name].forEach(function (alias) {
			optstr += ', ' + ((alias.length > 1) ? '--' : '-') + alias.replace('_', '-');
		});
		var ht = utils.wrap(help[name].split('\n'), COL_WIDTH - OPT_WIDTH);

		if (optstr.length > OPT_WIDTH) console.log(colored(optstr, COL2));
		else {
			console.log(colored((optstr + utils.repeat(' ', OPT_WIDTH)).slice(0, OPT_WIDTH), COL2), ht[0]);
			ht = ht.splice(1);
		}
		ht.forEach(function (line) {
			console.log(utils.repeat(' ', OPT_WIDTH), line);
		});
		console.log();
	});

}  // }}}

// Process options {{{

function opt(name, aliases, type, default_val, help_text, choices) {
	var match = utils.comment_contents.exec(help_text.toString());
    var options = group.options;
    var seen = group.seen;
    var help = group.help;

	if (!match) {
		throw new TypeError('Multiline comment missing for: ' + name);
	}
	help_text = match[1];

	if (!type || type == 'bool') options.boolean[name] = true;
	else if (type == 'string') {
        options.string[name] = true;
        if (choices) options.choices[name] = choices;
    }
	
	if (default_val !== undefined) options.default[name] = default_val;

	if (aliases && aliases.length) {
		aliases.split(',').forEach(function(alias) {
			if (seen.hasOwnProperty(alias)) throw "The option name:" + alias + " has already been used.";
			seen[alias] = true;
		});
		options.alias[name] = aliases.split(',');
	} else options.alias[name] = [];

	if (seen.hasOwnProperty(name)) throw "The option name:" + name + " has already been used.";
	seen[name] = true;

	help[name] = help_text;
}
// }}}

function parse_args() {  // {{{
	var ans = {'files':[]};
	var name_map = {};
	var state, options, group;

	function plain_arg(arg) {
		if (state !== undefined) ans[state] = arg;
		else ans.files.push(arg);
		state = undefined;
	}

	function handle_opt(arg) {
		var oarg = arg;
        var is_long_opt = (arg[0] === '-') ? true : false;
		if (is_long_opt) arg = arg.substr(1);
		if (state !== undefined) ans[state] = '';
		state = undefined;
        if (!is_long_opt && arg.length > 1) {
            arg.split('').forEach(handle_opt);
            return;
        }
		var val = arg.indexOf('=');
		if (val > -1) {
			var t = arg.substr(val + 1);
			arg = arg.substr(0, val);
			val = t;
		} else val = undefined;

		name = name_map[arg.replace('-', '_')];
		if (!name) {
			print_usage(group);
			console.error('\nThe option:', colored('-' + oarg, 'red'), 'is not recognized');
			process.exit(1);
		}
		if (options.boolean.hasOwnProperty(name)) {
			if (!val) val = 'true';
			if (val === 'true' || val === '1') val = true;
			else if (val === 'false' || val === '0') val = false;
			else { console.error('The value:', colored(val, 'red'), 'is invalid for the boolean option:', colored(name, 'red')); process.exit(1); }
			ans[name] = val;
		} else {
			if (val !== undefined) ans[name] = val;
			else state = name;
		}
	}

    var all_args = process.argv.slice(2);
    ans.auto_mode = false;
    if (groups.hasOwnProperty(all_args[0])) {
        ans.mode = all_args[0];
        all_args = all_args.slice(1);
    } else {
        // this check is not robust, but, it will only fail if the repl mode takes any non-boolean options
        var has_files = all_args.filter(function (a) { return a[0] !== '-'; }).length > 0;
        ans.mode = (!has_files && process.stdin.isTTY) ? 'repl' : 'compile';
        ans.auto_mode = true;
    }
    options = groups[ans.mode].options;

	Object.getOwnPropertyNames(options.default).forEach(function(name) { ans[name] = options['default'][name]; });

	Object.getOwnPropertyNames(options.alias).forEach(function(name) { 
		name_map[name] = name;
		options.alias[name].forEach(function (alias) { name_map[alias] = name; });
	});

    var options_ended = false;

	all_args.forEach(function(arg) {
        if (options_ended) plain_arg(arg);
        else if (arg === '--') options_ended = true;
		else if (arg === '-') plain_arg(arg);

		else if (arg[0] === '-') handle_opt(arg.substr(1));

		else plain_arg(arg);
	});
	if (state !== undefined) plain_arg('');
    Object.keys(options.choices).forEach(function(name) {
        var allowed = options.choices[name];
        if (allowed.indexOf(ans[name]) < 0) {
            print_usage(groups[ans.mode]);
            console.error('The value "' + colored(ans[name], 'red') + '" is not allowed for ' + colored(name, 'red') + '. Allowed values: ' + options.choices[name].join(', '));
            process.exit(1);
        }
    });
	return ans;
} // }}}

create_group('compile', "[input1.pyj input2.pyj ...]", function(){/*
Compile RapydScript source code into JavaScript
output.
*/});

opt("output", 'o', 'string', '', function(){/*
Output file (default STDOUT)
*/});

opt("bare", 'b', 'bool', false, function(){/*
Remove the module wrapper that prevents RapydScript 
scope from bleeding into other JavaScript logic 
*/});

opt("auto_bind", 'i', 'bool', false, function(){/*
Automatically bind function methods to functions 
themselves instead of using @bound decorator 
[experimental].
*/});

opt("uglify", 'u', 'bool', false, function(){/*
Minify the output instead of pretty printing it.
*/});

opt("omit_baselib", 'm', 'bool', false, function(){/*
Omit baselib functions. Use this if you have a 
different way of ensuring they're imported. For example,
you could import one of the baselib-plain-*.js files directly
into the global namespace.
*/});

opt("js_version", 'js,j', 'string', '5', function(){/*
The JavaScript version to output. By default, ES 5 
compatible JavaScript is output. You can specify 6 
to output ES 6 compatible JavaScript instead. The ES 6
version of the code will be smaller and faster by making
use of some ES 6 only features, such as iterators and
generators.
*/}, ['5', '6']);

opt("comments", undefined, 'string', '', function(){/*
Preserve copyright comments in the output.
By default this works like Google Closure, keeping 
JSDoc-style comments that contain "@license" or 
"@preserve". You can optionally pass one of the 
following arguments to this flag:
- "all" to keep all comments
- a valid JS regexp (needs to start with a slash) to 
keep only comments that match.

Note that currently not *all* comments can be kept 
when compression is on, because of dead code removal 
or cascading statements into sequences.
*/});

opt("stats", undefined, 'bool', false, function(){/*
Display operations run time on STDERR.
*/});

opt("execute", 'x,exec', 'bool', false, function(){/*
Compile and execute the RapydScript code, all in
one invocation. Useful if you wish to use RapydScript for
scripting. Note that you can also use the -o option to
have the compiled JavaScript written out to a file
before being executed. If you specify this option you
should not specify the -m option to omit the baselib, or 
execution will fail.
*/});

create_group('repl', '', function(){/*
Run a Read-Eval-Print-Loop (REPL). This allows
you to type and run RapydScript at a live
command prompt.
*/});

opt("no_js", '', 'bool', false, function(){/*
Do not display the compiled JavaScript before executing
it.
*/});

create_group('lint', "[input1.pyj input2.pyj ...]", function(){/*
Run the RapydScript linter. This will find various 
possible problems in the .pyj files you specify and 
write messages about them to stdout.
The main check it performs is for unused/undefined 
symbols, like pyflakes does for python.
*/}, function() {/*
In addition to the command line options listed below,
you can also control the linter in a couple of other ways.

In the actual source files, you can turn off specific checks
on a line by line basis by adding: # noqa:check1,check2...
to the end of the line. For example:

  f()  # noqa: undef

will prevent the linter from showing undefined symbol
errors for this line. You can also turn off individual checks
at the file level, by putting the noqa directive on a
line by itself near the top of the file, for example:

# noqa: undef

Similarly, you can tell the linter
about global (builtin) symbols with a comment near the top
of the file, for example:

# globals:assert,myglobalvar

This will prevent the linter form treating these names as 
undefined symbols.

Finally, the linter looks for a setup.cfg file in the
directory containing the file being linted or any of its 
parent directories. You can both turn off individual checks
and define project specific global symbols in the setup.cfg
file, like this:

[rapydscript]
globals=myglobalvar,otherglobalvar
noqa=undef,eol-semicolon

*/
});

opt("globals", 'g,b,builtins', 'string', '', function(){/*
Comma separated list of additional names that the linter will
treat as global symbols. It ignores undefined errors for
global symbols.
*/});

opt("noqa", 'e,ignore,exclude', 'string', '', function(){/*
Comma separated list of linter checks to skip. The linter
will not report errors corresponding to these checks.
The check names are output in the linter's normal output, you
can also list all check names with --noqa-list.
*/});

opt("errorformat", 'f,s,style', 'string', 'human', function(){/*
Output the results in the specified format. Valid formats are:
human - output is suited for reading by humans (the default)
json  - output is in JSON format
vim   - output can be consumed easily by vim's errorformat 
        directive. Format is:
        filename:line:col:errortype:token:message [identifier]
undef - output only the names of undefined symbols in a form that
        can be easily copy/pasted
*/}, ['human', 'json', 'vim', 'undef']);

opt("noqa_list", '', 'bool', false, function(){/*
List all available linter checks, with a brief
description, and exit.
*/});

create_group('test', '[test1 test2...]', function(){/*
Run RapydScript tests. You can specify the name of 
individual test files to only run tests from those 
files. For example:
test baselib functions
*/});

create_group('self', '', function(){/*
Compile the compiler itself. It will only actually 
compile if something has changed since the last time 
it was called. To force a recompilation, simply 
delete lib/signatures.json
*/});

opt("complete", 'c,f,full', 'bool', false, function(){/*
Run the compilation repeatedly, as many times as neccessary,
so that the compiler is built with the most upto date version
of itself.
*/});

opt("test", 't', 'bool', false, function(){/*
Run the test suite after building completes.
*/});

opt("profile", 'p', 'bool', false, function(){/*
Run a CPU profiler which will output its data to
self.cpuprofile. The data can then be analysed with 
node-inspector.
*/});

create_group('gettext', "[input1.pyj input_dir ...]", function(){/*
Extract strings marked for translation from the specified
source files and directories. 
*/}, function() {/*
Directories are scanned recursively for .pyj files. If no 
arguments are specified, the source code is read from stdin.

Translatable string are output on stdout in the .po format.
Translatable strings are detected in the input as literal 
string arguments to the functions _(), gettext() and ngettext().
*/
});

opt("omit-header", 'm', 'bool', false, function(){/*
Do not write header with 'msgid ""' entry.
*/});

opt("package-name", '', 'string', 'XXX', function(){/*
Set the package name in the header
*/});

opt("package-version", '', 'string', 'XXX', function(){/*
Set the package version in the header
*/});

opt("bugs-address", 'bug-address', 'string', 'bugs@example.com', function(){/*
Set the email address for bug reports in the header
*/});

create_group('msgfmt', "", function(){/*
Compile a .po file into a .json file that can
be used to load translations in a browser.
*/}, function() {/*
The .po file is read from
stdin and the .json file written to stdout. Note
that it is assumed the .po file is encoded in UTF-8.
If you .po file is in some other encoding, you will need to 
convert it to UTF-8 first.
*/
});

opt("use-fuzzy", 'f', 'bool', false, function(){/*
Use fuzzy translations, they are ignored by default.
*/});


var argv = module.exports.argv = parse_args();

if (argv.help) {
	print_usage((!argv.auto_mode) ? groups[argv.mode]: undefined);
	process.exit(0);
}

if (argv.version) {
    var json = require("../package.json");
    console.log(json.name + ' ' + json.version);
    process.exit(0);
}
