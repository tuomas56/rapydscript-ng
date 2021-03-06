/*
 * compile.js
 * Copyright (C) 2015 Kovid Goyal <kovid at kovidgoyal.net>
 *
 * Distributed under terms of the BSD license.
 */
"use strict";  /*jshint node:true */

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var RapydScript = require("./compiler").create_compiler();
var utils = require('./utils');

function read_whole_file(filename, cb) {
    if (!filename) {
        var chunks = [];
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function (chunk) {
            chunks.push(chunk);
        }).on('end', function () {
            cb(null, chunks.join(""));
        });
        process.openStdin();
    } else {
        fs.readFile(filename, "utf-8", cb);
    }
}

module.exports = function(start_time, argv, base_path, src_path, lib_path) {
    // configure settings for the output
    var OUTPUT_OPTIONS = {
        beautify: !argv.uglify,
        private_scope: !argv.bare,
        auto_bind: argv.auto_bind,
        omit_baselib: argv.omit_baselib,
        js_version: parseInt(argv.js_version),
    };
    var files = argv.files.slice();
    var STATS = {}, TOPLEVEL;
    var num_of_files = files.length || 1;

    function parse_file(code, file, toplevel) {
        return RapydScript.parse(code, {
            filename: file,
            toplevel: toplevel,
            basedir: path.dirname(file),
            auto_bind: argv.auto_bind,
            libdir: path.join(src_path, 'lib'),
            import_dirs: utils.get_import_dirs(argv.import_path),
        });
    }

    function write_output(output) {
        if (argv.output) {
            // Node's filesystem module cannot write directly to /dev/stdout
            if (argv.output == '/dev/stdout') console.log(output);
            else if (argv.output == '/dev/stderr') console.error(output);
            else fs.writeFileSync(argv.output, output, "utf8");
        } else if (!argv.execute){
            console.log(output);
        }
        if (argv.execute) {
            vm.runInNewContext(output, {'console':console, 'require':require}, {'filename':files[0]});
        }
    }

    function time_it(name, cont) {
        var t1 = new Date().getTime();
        var ret = cont();
        if (argv.stats) {
            var spent = new Date().getTime() - t1;
            if (STATS[name]) STATS[name] += spent;
            else STATS[name] = spent;
        }
        return ret;
    }

    function compile_single_file(err, code) {
        var output;
        if (err) {
            console.error("ERROR: can't read file: " + files[0]);
            process.exit(1);
        }
        time_it("parse", function(){
            try {
                TOPLEVEL = parse_file(code, files[0], TOPLEVEL);
            } catch (e) {
                if (!(e instanceof RapydScript.SyntaxError)) throw e;
                console.error((files[0] || '<stdin>') + ':' + e.toString());
                process.exit(1);
            }
        });

        try {
            output = new RapydScript.OutputStream(OUTPUT_OPTIONS);
        } catch(ex) {
            if (ex instanceof RapydScript.DefaultsError) {
                console.error(ex.msg);
                console.error("Supported options:");
                console.error(ex.defs);
                process.exit(1);
            }
            throw ex;
        }

        time_it("generate", function(){
            TOPLEVEL.print(output);
        });

        output = output.get();

        write_output(output);

        files = files.slice(1);
        if (files.length) {
            setImmediate(read_whole_file, files[0], compile_single_file);
            return;
        }
        if (argv.stats) {
            console.error(RapydScript.string_template("Timing information (compressed {count} files):", {
                count: num_of_files
            }));
            for (var i in STATS) if (STATS.hasOwnProperty(i)) {
                console.error(RapydScript.string_template("- {name}: {time}s", {
                    name: i,
                    time: (STATS[i] / 1000).toFixed(3)
                }));
            }
        }
    }


    if (argv.comments) {
        if (/^\//.test(argv.comments)) {
            OUTPUT_OPTIONS.comments = new Function("return(" + argv.comments + ")")();  // jshint ignore:line
        } else if (argv.comments == "all") {
            OUTPUT_OPTIONS.comments = true;
        } else {
            OUTPUT_OPTIONS.comments = function(node, comment) {
                var text = comment.value;
                var type = comment.type;
                if (type == "comment2") {
                    // multiline comment
                    return /@preserve|@license|@cc_on/i.test(text);
                }
            };
        }
    }

    if (!argv.omit_baselib) {
        var which = (OUTPUT_OPTIONS.beautify) ? 'pretty' : 'ugly';
        OUTPUT_OPTIONS.baselib = JSON.parse(fs.readFileSync(path.join(lib_path, 'baselib-' + which + '.js'), 'utf-8'));
    }

    if (files.filter(function(el){ return el == "-"; }).length > 1) {
        console.error("ERROR: Can read a single file from STDIN (two or more dashes specified)");
        process.exit(1);
    }

    setImmediate(read_whole_file, files[0], compile_single_file);

};

