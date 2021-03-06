var _$rapyd$_iterator_symbol = (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") ? Symbol.iterator : "iterator-Symbol-5d0927e5554349048cf0e3762a228256";
var _$rapyd$_kwargs_symbol = (typeof Symbol === "function") ? Symbol("kwargs-object") : "kwargs-object-Symbol-5d0927e5554349048cf0e3762a228256";
var _$rapyd$_cond_temp, _$rapyd$_expr_temp;
var _$rapyd$_object_counter = 0;
var abs = (function abs() {
            return Math.abs;
        })();
var max = (function max() {
            return Math.max;
        })();
var min = (function min() {
            return Math.min;
        })();
function dir(item) {
            var arr;
            arr = _$rapyd$_list_decorate([]);
            for (var i in item) {
                arr.push(i);
            }
            return arr;
        };
function ord(x) {
            var ans, second;
            ans = x.charCodeAt(0);
            if (55296 <= ans && ans <= 56319) {
                second = x.charCodeAt(1);
                if (56320 <= second && second <= 57343) {
                    return (ans - 55296) * 1024 + second - 56320 + 65536;
                }
                throw new TypeError("string is missing the low surrogate char");
            }
            return ans;
        };
function chr(code) {
            if (code <= 65535) {
                return String.fromCharCode(code);
            }
            code -= 65536;
            return String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
        };
function bin(x) {
            var ans;
            if (typeof x !== "number" || x % 1 !== 0) {
                throw new TypeError("integer required");
            }
            ans = x.toString(2);
            if (ans[0] === "-") {
                ans = "-" + "0b" + ans.slice(1);
            } else {
                ans = "0b" + ans;
            }
            return ans;
        };
function hex(x) {
            var ans;
            if (typeof x !== "number" || x % 1 !== 0) {
                throw new TypeError("integer required");
            }
            ans = x.toString(16);
            if (ans[0] === "-") {
                ans = "-" + "0x" + ans.slice(1);
            } else {
                ans = "0x" + ans;
            }
            return ans;
        };
function callable(x) {
            return typeof x === "function";
        };
function enumerate(iterable) {
            var ans, iterator;
            if (_$rapyd$_arraylike(iterable)) {
                ans = {
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            this._i += 1;
                            if (this._i < iterable.length) {
                                return {
                                    "done": false,
                                    "value": _$rapyd$_list_decorate([ this._i, iterable[this._i] ])
                                };
                            }
                            return {
                                "done": true
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = {
                    "_iterator": iterator,
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            var r;
                            r = this._iterator.next();
                            if (r.done) {
                                return {
                                    "done": true
                                };
                            }
                            this._i += 1;
                            return {
                                "done": false,
                                "value": _$rapyd$_list_decorate([ this._i, r.value ])
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            return enumerate(Object.keys(iterable));
        };
function iter(iterable) {
            var ans;
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                return (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            }
            if (_$rapyd$_arraylike(iterable)) {
                ans = {
                    "_i": -1,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            this._i += 1;
                            if (this._i < iterable.length) {
                                return {
                                    "done": false,
                                    "value": iterable[this._i]
                                };
                            }
                            return {
                                "done": true
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            return iter(Object.keys(iterable));
        };
function _$rapyd$_extends(child, parent) {
            child.prototype = Object.create(parent.prototype);
            child.prototype.constructor = child;
        };
function _$rapyd$_flatten(arr) {
            var ans, value;
            ans = _$rapyd$_list_decorate([]);
            for (var i=0; i<arr.length; i++) {
                value = arr[i];
                if (Array.isArray(value)) {
                    ans = ans.concat(_$rapyd$_flatten(value));
                } else {
                    ans.push(value);
                }
            }
            return ans;
        };
var _$rapyd$_in = (function _$rapyd$_in() {
            if (typeof Map === "function" && typeof Set === "function") {
                return (function() {
                    var _$rapyd$_anonfunc = function (val, arr) {
                        if (typeof arr === "string") {
                            return arr.indexOf(val) !== -1;
                        }
                        if (typeof arr.__contains__ === "function") {
                            return arr.__contains__(val);
                        }
                        if ((arr instanceof Map || arr instanceof Set)) {
                            return arr.has(val);
                        }
                        if (_$rapyd$_arraylike(arr)) {
                            return _$rapyd$_list_contains.call(arr, val);
                        }
                        return Object.prototype.hasOwnProperty.call(arr, val);
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["val", "arr"];
                    return _$rapyd$_anonfunc;
                })();
            }
            return (function() {
                var _$rapyd$_anonfunc = function (val, arr) {
                    if (typeof arr === "string") {
                        return arr.indexOf(val) !== -1;
                    }
                    if (typeof arr.__contains__ === "function") {
                        return arr.__contains__(val);
                    }
                    if (_$rapyd$_arraylike(arr)) {
                        return _$rapyd$_list_contains.call(arr, val);
                    }
                    return Object.prototype.hasOwnProperty.call(arr, val);
                };

                _$rapyd$_anonfunc.__argnames__ = ["val", "arr"];
                return _$rapyd$_anonfunc;
            })();
        })();
function _$rapyd$_Iterable(iterable) {
            var iterator, ans, result;
            if (_$rapyd$_arraylike(iterable)) {
                return iterable;
            }
            if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
                iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
                ans = _$rapyd$_list_decorate([]);
                result = iterator.next();
                while (!result.done) {
                    ans.push(result.value);
                    result = iterator.next();
                }
                return ans;
            }
            return Object.keys(iterable);
        };
var len = (function _$rapyd$_len() {
            if (typeof Set === "function" && typeof Map === "function") {
                return (function() {
                    var _$rapyd$_anonfunc = function (obj) {
                        if (_$rapyd$_arraylike(obj)) {
                            return obj.length;
                        }
                        if (obj instanceof Set || obj instanceof Map) {
                            return obj.size;
                        }
                        if (typeof obj.__len__ === "function") {
                            return obj.__len__();
                        }
                        return Object.keys(obj).length;
                    };

                    _$rapyd$_anonfunc.__argnames__ = ["obj"];
                    return _$rapyd$_anonfunc;
                })();
            }
            return (function() {
                var _$rapyd$_anonfunc = function (obj) {
                    if (_$rapyd$_arraylike(obj)) {
                        return obj.length;
                    }
                    if (typeof obj.__len__ === "function") {
                        return obj.__len__();
                    }
                    return Object.keys(obj).length;
                };

                _$rapyd$_anonfunc.__argnames__ = ["obj"];
                return _$rapyd$_anonfunc;
            })();
        })();
function range(start, stop, step) {
            var length;
            if (arguments.length <= 1) {
                stop = start || 0;
                start = 0;
            }
            step = arguments[2] || 1;
            length = Math.max(Math.ceil((stop - start) / step), 0);
            return (function(){
                var _$rapyd$_d = {};
                _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                _$rapyd$_d["_i"] = start - step;
                _$rapyd$_d["_idx"] = -1;
                _$rapyd$_d["next"] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        this._i += step;
                        this._idx += 1;
                        if (this._idx >= length) {
                            return {
                                "done": true
                            };
                        }
                        return {
                            "done": false,
                            "value": this._i
                        };
                    };
                    return _$rapyd$_anonfunc;
                })();
                return _$rapyd$_d;
            })();
        };
function reversed(iterable) {
            var ans;
            if (_$rapyd$_arraylike(iterable)) {
                ans = {
                    "_i": iterable.length,
                    "next": (function() {
                        var _$rapyd$_anonfunc = function () {
                            this._i -= 1;
                            if (this._i > -1) {
                                return {
                                    "done": false,
                                    "value": iterable[this._i]
                                };
                            }
                            return {
                                "done": true
                            };
                        };
                        return _$rapyd$_anonfunc;
                    })()
                };
                ans[_$rapyd$_iterator_symbol] = (function() {
                    var _$rapyd$_anonfunc = function () {
                        return this;
                    };
                    return _$rapyd$_anonfunc;
                })();
                return ans;
            }
            throw new TypeError("reversed() can only be called on arrays or strings");
        };
function getattr(obj, name, defval) {
            var ret;
            try {
                ret = obj[name];
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof TypeError) {
                    if (defval === undefined) {
                        throw new AttributeError("The attribute " + name + " is not present");
                    }
                    return defval;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            if (ret === undefined && !(name in obj)) {
                if (defval === undefined) {
                    throw new AttributeError("The attribute " + name + " is not present");
                }
                ret = defval;
            }
            return ret;
        };
function setattr(obj, name, value) {
            obj[name] = value;
        };
function hasattr(obj, name) {
            return name in obj;
        };
var _$rapyd$_desugar_kwargs = (function _$rapyd$_desugar_kwargs() {
            if (typeof Object.assign === "function") {
                return (function() {
                    var _$rapyd$_anonfunc = function () {
                        var ans;
                        ans = {};
                        ans[_$rapyd$_kwargs_symbol] = true;
                        for (var i = 0; i < arguments.length; i++) {
                            Object.assign(ans, arguments[i]);
                        }
                        return ans;
                    };
                    return _$rapyd$_anonfunc;
                })();
            }
            return (function() {
                var _$rapyd$_anonfunc = function () {
                    var ans, keys;
                    ans = {};
                    ans[_$rapyd$_kwargs_symbol] = true;
                    for (var i = 0; i < arguments.length; i++) {
                        keys = Object.keys(arguments[i]);
                        for (var j = 0; j < keys.length; j++) {
                            ans[keys[j]] = arguments[i][keys[j]];
                        }
                    }
                    return ans;
                };
                return _$rapyd$_anonfunc;
            })();
        })();
function _$rapyd$_interpolate_kwargs(f, supplied_args) {
            var has_prop, kwobj, args, prop;
            if (!f.__argnames__) {
                return f.apply(this, supplied_args);
            }
            has_prop = Object.prototype.hasOwnProperty;
            kwobj = supplied_args.pop();
            if (f.__handles_kwarg_interpolation__) {
                args = new Array(Math.max(supplied_args.length, f.__argnames__.length) + 1);
                args[args.length-1] = kwobj;
                for (var i = 0; i < args.length - 1; i++) {
                    if (i < f.__argnames__.length) {
                        prop = f.__argnames__[i];
                        if (has_prop.call(kwobj, prop)) {
                            args[i] = kwobj[prop];
                            delete kwobj[prop];
                        } else if (i < supplied_args.length) {
                            args[i] = supplied_args[i];
                        }
                    } else {
                        args[i] = supplied_args[i];
                    }
                }
                return f.apply(this, args);
            }
            for (var i = 0; i < f.__argnames__.length; i++) {
                prop = f.__argnames__[i];
                if (has_prop.call(kwobj, prop)) {
                    supplied_args[i] = kwobj[prop];
                }
            }
            return f.apply(this, supplied_args);
        };
function _$rapyd$_interpolate_kwargs_constructor(apply, f, supplied_args) {
            if (apply) {
                f.apply(this, supplied_args);
            } else {
                _$rapyd$_interpolate_kwargs.call(this, f, supplied_args);
            }
            return this;
        };
function _$rapyd$_bool(val) {
    return !!val;
};

_$rapyd$_bool.__argnames__ = ["val"];

function _$rapyd$_bind(fn, thisArg) {
    var ret;
    if (fn.orig) {
        fn = fn.orig;
    }
    if (thisArg === false) {
        return fn;
    }
    ret = (function() {
        var _$rapyd$_anonfunc = function () {
            return fn.apply(thisArg, arguments);
        };
        return _$rapyd$_anonfunc;
    })();
    ret.orig = fn;
    return ret;
};

_$rapyd$_bind.__argnames__ = ["fn", "thisArg"];

function _$rapyd$_rebind_all(thisArg, rebind) {
    if (typeof rebind === "undefined") {
        rebind = true;
    }
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) {
                thisArg[p] = _$rapyd$_bind(thisArg[p], thisArg);
            } else {
                thisArg[p] = thisArg[p].orig;
            }
        }
    }
};

_$rapyd$_rebind_all.__argnames__ = ["thisArg", "rebind"];

function _$rapyd$_eslice(arr, step, start, end) {
    var isString;
    arr = arr.slice(0);
    if (typeof arr === "string" || arr instanceof String) {
        isString = true;
        arr = arr.split("");
    }
    if (step < 0) {
        step = -step;
        arr.reverse();
        if (typeof start !== "undefined") {
            start = arr.length - start - 1;
        }
        if (typeof end !== "undefined") {
            end = arr.length - end - 1;
        }
    }
    if (typeof start === "undefined") {
        start = 0;
    }
    if (typeof end === "undefined") {
        end = arr.length;
    }
    arr = arr.slice(start, end).filter((function() {
        var _$rapyd$_anonfunc = function (e, i) {
            return i % step === 0;
        };

        _$rapyd$_anonfunc.__argnames__ = ["e", "i"];
        return _$rapyd$_anonfunc;
    })());
    return (isString) ? arr.join("") : arr;
};

_$rapyd$_eslice.__argnames__ = ["arr", "step", "start", "end"];

function _$rapyd$_mixin(target, source, overwrite) {
    for (var i in source) {
        if (source.hasOwnProperty(i) && overwrite || typeof target[i] === "undefined") {
            target[i] = source[i];
        }
    }
};

_$rapyd$_mixin.__argnames__ = ["target", "source", "overwrite"];

function _$rapyd$_print() {
    var parts;
    if (typeof console === "object") {
        parts = [];
        for (var i = 0; i < arguments.length; i++) {
            parts.push(_$rapyd$_str(arguments[i]));
        }
        console.log(parts.join(" "));
    }
};

function _$rapyd$_int(val, base) {
    var ans;
    ans = parseInt(val, base || 10);
    if (isNaN(ans)) {
        throw new ValueError("Invalid literal for int with base " + (base || 10) + ": " + val);
    }
    return ans;
};

_$rapyd$_int.__argnames__ = ["val", "base"];

function _$rapyd$_float() {
    var ans;
    ans = parseFloat.apply(null, arguments);
    if (isNaN(ans)) {
        throw new ValueError("Could not convert string to float: " + arguments[0]);
    }
    return ans;
};

function _$rapyd$_arraylike_creator() {
    var names;
    names = "Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" ");
    if (typeof HTMLCollection === "function") {
        names = names.concat("HTMLCollection NodeList NamedNodeMap".split(" "));
    }
    return (function() {
        var _$rapyd$_anonfunc = function (x) {
            if (Array.isArray(x) || typeof x === "string" || names.indexOf(Object.prototype.toString.call(x).slice(8, -1)) > -1) {
                return true;
            }
            return false;
        };

        _$rapyd$_anonfunc.__argnames__ = ["x"];
        return _$rapyd$_anonfunc;
    })();
};

function options_object(f) {
    return (function() {
        var _$rapyd$_anonfunc = function () {
            if (typeof arguments[arguments.length - 1] === "object") {
                arguments[arguments.length - 1][_$rapyd$_kwargs_symbol] = true;
            }
            return f.apply(this, arguments);
        };
        return _$rapyd$_anonfunc;
    })();
};

options_object.__argnames__ = ["f"];

function _$rapyd$_id(x) {
    return x._$rapyd$_object_id;
};

_$rapyd$_id.__argnames__ = ["x"];

var bool = _$rapyd$_bool, bind = _$rapyd$_bind, rebind_all = _$rapyd$_rebind_all;
var float = _$rapyd$_float, int = _$rapyd$_int, arraylike = _$rapyd$_arraylike_creator(), _$rapyd$_arraylike = arraylike;
var mixin = _$rapyd$_mixin, print = _$rapyd$_print, eslice = _$rapyd$_eslice, id = _$rapyd$_id;;
var _$rapyd$_chain_assign_temp;
function _$rapyd$_equals(a, b) {
    var _$rapyd$_unpack, akeys, bkeys, key;
    if (a === b) {
        return true;
    }
    if (a && typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    if (b && typeof b.__eq__ === "function") {
        return b.__eq__(a);
    }
    if (_$rapyd$_arraylike(a) && _$rapyd$_arraylike(b)) {
        if ((a.length !== b.length && (typeof a.length !== "object" || _$rapyd$_not_equals(a.length, b.length)))) {
            return false;
        }
        for (var i=0; i < a.length; i++) {
            if (!((a[i] === b[i] || typeof a[i] === "object" && _$rapyd$_equals(a[i], b[i])))) {
                return false;
            }
        }
        return true;
    }
    if (a && b && a.constructor === b.constructor && a.constructor === Object) {
        _$rapyd$_unpack = [Object.keys(a), Object.keys(b)];
        akeys = _$rapyd$_unpack[0];
        bkeys = _$rapyd$_unpack[1];
        if (akeys.length !== bkeys.length) {
            return false;
        }
        for (var j=0; j < akeys.length; j++) {
            key = akeys[j];
            if (!((a[key] === b[key] || typeof a[key] === "object" && _$rapyd$_equals(a[key], b[key])))) {
                return false;
            }
        }
        return true;
    }
    return false;
};

_$rapyd$_equals.__argnames__ = ["a", "b"];

function _$rapyd$_not_equals(a, b) {
    if (a === b) {
        return false;
    }
    if (a && typeof a.__ne__ === "function") {
        return a.__ne__(b);
    }
    if (b && typeof b.__ne__ === "function") {
        return b.__ne__(a);
    }
    return !_$rapyd$_equals(a, b);
};

_$rapyd$_not_equals.__argnames__ = ["a", "b"];

var equals = _$rapyd$_equals;
function _$rapyd$_list_extend(iterable) {
    var start, iterator, result;
    if (Array.isArray(iterable) || typeof iterable === "string") {
        start = this.length;
        this.length += iterable.length;
        for (var i = 0; i < iterable.length; i++) {
            this[start + i] = iterable[i];
        }
    } else {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        result = iterator.next();
        while (!result.done) {
            this.push(result.value);
            result = iterator.next();
        }
    }
};

_$rapyd$_list_extend.__argnames__ = ["iterable"];

function _$rapyd$_list_index(val, start, stop) {
    var idx;
    start = start || 0;
    if (start < 0) {
        start = this.length + start;
    }
    if (start < 0) {
        throw new ValueError(val + " is not in list");
    }
    if (stop === undefined) {
        idx = this.indexOf(val, start);
        if (idx === -1) {
            throw new ValueError(val + " is not in list");
        }
        return idx;
    }
    if (stop < 0) {
        stop = this.length + stop;
    }
    for (var i = start; i < stop; i++) {
        if ((this[i] === val || typeof this[i] === "object" && _$rapyd$_equals(this[i], val))) {
            return i;
        }
    }
    throw new ValueError(val + " is not in list");
};

_$rapyd$_list_index.__argnames__ = ["val", "start", "stop"];

function _$rapyd$_list_pop(index) {
    var ans;
    if (this.length === 0) {
        throw new IndexError("list is empty");
    }
    ans = this.splice(index, 1);
    if (!ans.length) {
        throw new IndexError("pop index out of range");
    }
    return ans[0];
};

_$rapyd$_list_pop.__argnames__ = ["index"];

function _$rapyd$_list_remove(value) {
    var idx;
    idx = this.indexOf(value);
    if (idx === -1) {
        throw new ValueError(value + " not in list");
    }
    this.splice(idx, 1);
};

_$rapyd$_list_remove.__argnames__ = ["value"];

function _$rapyd$_list_to_string() {
    return "[" + this.join(", ") + "]";
};

function _$rapyd$_list_insert(index, val) {
    if (index < 0) {
        index += this.length;
    }
    index = min(this.length, max(index, 0));
    if (index === 0) {
        this.unshift(val);
        return;
    }
    for (var i = this.length; i > index; i--) {
        this[i] = this[i - 1];
    }
    this[index] = val;
};

_$rapyd$_list_insert.__argnames__ = ["index", "val"];

function _$rapyd$_list_copy() {
    return _$rapyd$_list_constructor(this);
};

function _$rapyd$_list_clear() {
    this.length = 0;
};

function _$rapyd$_list_as_array() {
    return Array.prototype.slice.call(this);
};

function _$rapyd$_list_count(value) {
    return this.reduce((function() {
        var _$rapyd$_anonfunc = function (n, val) {
            return n + (val === value);
        };

        _$rapyd$_anonfunc.__argnames__ = ["n", "val"];
        return _$rapyd$_anonfunc;
    })(), 0);
};

_$rapyd$_list_count.__argnames__ = ["value"];

function _$rapyd$_list_sort_key(value) {
    var t;
    t = typeof value;
    if (t === "string" || t === "number") {
        return value;
    }
    return value.toString();
};

_$rapyd$_list_sort_key.__argnames__ = ["value"];

function _$rapyd$_list_sort_cmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

_$rapyd$_list_sort_cmp.__argnames__ = ["a", "b"];

function _$rapyd$_list_sort(key, reverse) {
    var mult, keymap, k;
    key = key || _$rapyd$_list_sort_key;
    mult = (reverse) ? -1 : 1;
    keymap = dict();
    for (var i=0; i < this.length; i++) {
        k = this[i];
        keymap.set(k, key(k));
    }
    this.sort((function() {
        var _$rapyd$_anonfunc = function (a, b) {
            return mult * _$rapyd$_list_sort_cmp(keymap.get(a), keymap.get(b));
        };

        _$rapyd$_anonfunc.__argnames__ = ["a", "b"];
        return _$rapyd$_anonfunc;
    })());
};

_$rapyd$_list_sort.__argnames__ = ["key", "reverse"];

function _$rapyd$_list_concat() {
    var ans;
    ans = Array.prototype.concat.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
};

function _$rapyd$_list_slice() {
    var ans;
    ans = Array.prototype.slice.apply(this, arguments);
    _$rapyd$_list_decorate(ans);
    return ans;
};

function _$rapyd$_list_iterator(value) {
    var self;
    self = this;
    return {
        "_i": -1,
        "_list": self,
        "next": (function() {
            var _$rapyd$_anonfunc = function () {
                this._i += 1;
                if (this._i >= this._list.length) {
                    return {
                        "done": true
                    };
                }
                return {
                    "done": false,
                    "value": this._list[this._i]
                };
            };
            return _$rapyd$_anonfunc;
        })()
    };
};

_$rapyd$_list_iterator.__argnames__ = ["value"];

function _$rapyd$_list_len() {
    return this.length;
};

function _$rapyd$_list_contains(val) {
    for (var i = 0; i < this.length; i++) {
        if ((this[i] === val || typeof this[i] === "object" && _$rapyd$_equals(this[i], val))) {
            return true;
        }
    }
    return false;
};

_$rapyd$_list_contains.__argnames__ = ["val"];

function _$rapyd$_list_eq(other) {
    if (!_$rapyd$_arraylike(other)) {
        return false;
    }
    if ((this.length !== other.length && (typeof this.length !== "object" || _$rapyd$_not_equals(this.length, other.length)))) {
        return false;
    }
    for (var i = 0; i < this.length; i++) {
        if (!((this[i] === other[i] || typeof this[i] === "object" && _$rapyd$_equals(this[i], other[i])))) {
            return false;
        }
    }
    return true;
};

_$rapyd$_list_eq.__argnames__ = ["other"];

function _$rapyd$_list_decorate(ans) {
    ans.append = Array.prototype.push;
    ans.toString = _$rapyd$_list_to_string;
    ans.inspect = _$rapyd$_list_to_string;
    ans.extend = _$rapyd$_list_extend;
    ans.index = _$rapyd$_list_index;
    ans.pypop = _$rapyd$_list_pop;
    ans.remove = _$rapyd$_list_remove;
    ans.insert = _$rapyd$_list_insert;
    ans.copy = _$rapyd$_list_copy;
    ans.clear = _$rapyd$_list_clear;
    ans.count = _$rapyd$_list_count;
    ans.concat = _$rapyd$_list_concat;
    ans.pysort = _$rapyd$_list_sort;
    ans.slice = _$rapyd$_list_slice;
    ans.as_array = _$rapyd$_list_as_array;
    ans.__len__ = _$rapyd$_list_len;
    ans.__contains__ = _$rapyd$_list_contains;
    ans.__eq__ = _$rapyd$_list_eq;
    ans.constructor = _$rapyd$_list_constructor;
    if (typeof ans[_$rapyd$_iterator_symbol] !== "function") {
        ans[_$rapyd$_iterator_symbol] = _$rapyd$_list_iterator;
    }
    return ans;
};

_$rapyd$_list_decorate.__argnames__ = ["ans"];

function _$rapyd$_list_constructor(iterable) {
    var ans, iterator, result;
    if (iterable === undefined) {
        ans = [];
    } else if (_$rapyd$_arraylike(iterable)) {
        ans = new Array(iterable.length);
        for (var i = 0; i < iterable.length; i++) {
            ans[i] = iterable[i];
        }
    } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
        iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
        ans = _$rapyd$_list_decorate([]);
        result = iterator.next();
        while (!result.done) {
            ans.push(result.value);
            result = iterator.next();
        }
    } else if (typeof iterable === "number") {
        ans = new Array(iterable);
    } else {
        ans = Object.keys(iterable);
    }
    return _$rapyd$_list_decorate(ans);
};

_$rapyd$_list_constructor.__argnames__ = ["iterable"];

_$rapyd$_list_constructor.__name__ = "list";
var list = _$rapyd$_list_constructor, list_wrap = _$rapyd$_list_decorate;
function sorted() {
    var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true) ? undefined : arguments[0];
    var key = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? sorted.__defaults__.key : arguments[1];
    var reverse = (arguments[2] === undefined || ( 2 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? sorted.__defaults__.reverse : arguments[2];
    var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
    if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "key")){
        key = _$rapyd$_kwargs_obj.key;
    }
    if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "reverse")){
        reverse = _$rapyd$_kwargs_obj.reverse;
    }
    var ans;
    ans = _$rapyd$_list_constructor(iterable);
    ans.pysort(key, reverse);
    return ans;
};

sorted.__defaults__ = {
    key:null, 
    reverse:false
};

sorted.__handles_kwarg_interpolation__ = true;

sorted.__argnames__ = ["iterable", "key", "reverse"];

var _$rapyd$_global_object_id = 0, _$rapyd$_set_implementation;
function _$rapyd$_set_keyfor(x) {
    var t, ans;
    t = typeof x;
    if (t === "string" || t === "number" || t === "boolean") {
        return "_" + t[0] + x;
    }
    if (x === null) {
        return "__!@#$0";
    }
    ans = x._$rapyd$_hash_key_prop;
    if (ans === undefined) {
        ans = "_!@#$" + (++_$rapyd$_global_object_id);
        Object.defineProperty(x, "_$rapyd$_hash_key_prop", {
            "value": ans
        });
    }
    return ans;
};

_$rapyd$_set_keyfor.__argnames__ = ["x"];

function _$rapyd$_set_polyfill() {
    this._store = {};
    this.size = 0;
};

_$rapyd$_set_polyfill.prototype.add = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (!Object.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
            this._store[key] = x;
        }
        return this;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.delete = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (Object.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.has = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set_polyfill.prototype.values = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
if (typeof Set !== "function" || typeof Set.prototype.delete !== "function") {
    _$rapyd$_set_implementation = _$rapyd$_set_polyfill;
} else {
    _$rapyd$_set_implementation = Set;
}
function _$rapyd$_set(iterable) {
    var ans, s, iterator, result, keys;
    if (this instanceof _$rapyd$_set) {
        this.jsset = new _$rapyd$_set_implementation;
        ans = this;
        if (iterable === undefined) {
            return ans;
        }
        s = ans.jsset;
        if (_$rapyd$_arraylike(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                s.add(iterable[i]);
            }
        } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
            iterator = (typeof Map === "function" && iterable instanceof Map) ? iterable.keys() : iterable[_$rapyd$_iterator_symbol]();
            result = iterator.next();
            while (!result.done) {
                s.add(result.value);
                result = iterator.next();
            }
        } else {
            keys = Object.keys(iterable);
            for (var j=0; j < keys.length; j++) {
                s.add(keys[j]);
            }
        }
        return ans;
    } else {
        return new _$rapyd$_set(iterable);
    }
};

_$rapyd$_set.__argnames__ = ["iterable"];

_$rapyd$_set.prototype.__name__ = "set";
Object.defineProperties(_$rapyd$_set.prototype, {
    "length": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsset.size;
            };
            return _$rapyd$_anonfunc;
        })()
    },
    "size": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsset.size;
            };
            return _$rapyd$_anonfunc;
        })()
    }
});
_$rapyd$_set.prototype.__len__ = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsset.size;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return this.jsset.has(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.add = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this.jsset.add(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function () {
        this.jsset.clear();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.copy = (function() {
    var _$rapyd$_anonfunc = function () {
        return _$rapyd$_set(this);
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.discard = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this.jsset.delete(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype[_$rapyd$_iterator_symbol] = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsset.values();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.difference = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans, s, iterator, r, x, has;
        ans = new _$rapyd$_set;
        s = ans.jsset;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            has = false;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].has(x)) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                s.add(x);
            }
            r = iterator.next();
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.difference_update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, remove, iterator, r, x;
        s = this.jsset;
        remove = [];
        iterator = s.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i].has(x)) {
                    remove.push(x);
                    break;
                }
            }
            r = iterator.next();
        }
        for (var j = 0; j < remove.length; j++) {
            s.delete(remove[j]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.intersection = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans, s, iterator, r, x, has;
        ans = new _$rapyd$_set;
        s = ans.jsset;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            has = true;
            for (var i = 0; i < arguments.length; i++) {
                if (!arguments[i].has(x)) {
                    has = false;
                    break;
                }
            }
            if (has) {
                s.add(x);
            }
            r = iterator.next();
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.intersection_update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, remove, iterator, r, x;
        s = this.jsset;
        remove = [];
        iterator = s.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            for (var i = 0; i < arguments.length; i++) {
                if (!arguments[i].has(x)) {
                    remove.push(x);
                    break;
                }
            }
            r = iterator.next();
        }
        for (var j = 0; j < remove.length; j++) {
            s.delete(remove[j]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.isdisjoint = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (other.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.issubset = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        iterator = this.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (!other.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.issuperset = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var s, iterator, r, x;
        s = this.jsset;
        iterator = other.jsset.values();
        r = iterator.next();
        while (!r.done) {
            x = r.value;
            if (!s.has(x)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.pop = (function() {
    var _$rapyd$_anonfunc = function () {
        var iterator, r;
        iterator = this.jsset.values();
        r = iterator.next();
        if (r.done) {
            throw new KeyError("pop from an empty set");
        }
        this.jsset.delete(r.value);
        return r.value;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.remove = (function() {
    var _$rapyd$_anonfunc = function (x) {
        if (!this.jsset.delete(x)) {
            throw new KeyError(x.toString());
        }
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.symmetric_difference = (function() {
    var _$rapyd$_anonfunc = function (other) {
        return this.union(other).difference(this.intersection(other));
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.symmetric_difference_update = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var common;
        common = this.intersection(other);
        this.update(other);
        this.difference_update(common);
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.union = (function() {
    var _$rapyd$_anonfunc = function () {
        var ans;
        ans = _$rapyd$_set(this);
        ans.update.apply(ans, arguments);
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.update = (function() {
    var _$rapyd$_anonfunc = function () {
        var s, iterator, r;
        s = this.jsset;
        for (var i=0; i < arguments.length; i++) {
            iterator = arguments[i][_$rapyd$_iterator_symbol]();
            r = iterator.next();
            while (!r.done) {
                s.add(r.value);
                r = iterator.next();
            }
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        return "{" + list(this).join(", ") + "}";
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_set.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_set.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_set.prototype.__eq__ = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r;
        if (!(other instanceof this.constructor)) {
            return false;
        }
        if (other.size !== this.size) {
            return false;
        }
        if (other.size === 0) {
            return true;
        }
        iterator = other[_$rapyd$_iterator_symbol]();
        r = iterator.next();
        while (!r.done) {
            if (!this.has(r.value)) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
function _$rapyd$_set_wrap(x) {
    var ans;
    ans = new _$rapyd$_set;
    ans.jsset = x;
    return ans;
};

_$rapyd$_set_wrap.__argnames__ = ["x"];

var set = _$rapyd$_set, set_wrap = _$rapyd$_set_wrap;
var _$rapyd$_dict_implementation;
function _$rapyd$_dict_polyfill() {
    this._store = {};
    this.size = 0;
};

_$rapyd$_dict_polyfill.prototype.set = (function() {
    var _$rapyd$_anonfunc = function (x, value) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (!Object.hasOwnProperty.call(this._store, key)) {
            this.size += 1;
        }
        this._store[key] = [x, value];
        return this;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function (x) {
        this._store = {};
        this.size = 0;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.delete = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var key;
        key = _$rapyd$_set_keyfor(x);
        if (Object.hasOwnProperty.call(this._store, key)) {
            this.size -= 1;
            delete this._store[key];
            return true;
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.has = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return Object.hasOwnProperty.call(this._store, _$rapyd$_set_keyfor(x));
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.get = (function() {
    var _$rapyd$_anonfunc = function (x) {
        try {
            return this._store[_$rapyd$_set_keyfor(x)][1];
        } catch (_$rapyd$_Exception) {
            if (_$rapyd$_Exception instanceof TypeError) {
                return undefined;
            } else {
                throw _$rapyd$_Exception;
            }
        }
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.values = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]][1]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.keys = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]][0]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict_polyfill.prototype.entries = (function() {
    var _$rapyd$_anonfunc = function (x) {
        var keys, s;
        keys = Object.keys(this._store);
        s = this._store;
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_keys"] = keys;
            _$rapyd$_d["_i"] = -1;
            _$rapyd$_d["_s"] = s;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    this._i += 1;
                    if (this._i >= this._keys.length) {
                        return {
                            "done": true
                        };
                    }
                    return {
                        "done": false,
                        "value": s[this._keys[this._i]]
                    };
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
if (typeof Map !== "function" || typeof Map.prototype.delete !== "function") {
    _$rapyd$_dict_implementation = _$rapyd$_dict_polyfill;
} else {
    _$rapyd$_dict_implementation = Map;
}
function _$rapyd$_dict(iterable) {
    if (this instanceof _$rapyd$_dict) {
        this.jsmap = new _$rapyd$_dict_implementation;
        if (iterable !== undefined) {
            this.update(iterable);
        }
        return this;
    } else {
        return new _$rapyd$_dict(iterable);
    }
};

_$rapyd$_dict.__argnames__ = ["iterable"];

_$rapyd$_dict.prototype.__name__ = "dict";
Object.defineProperties(_$rapyd$_dict.prototype, {
    "length": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsmap.size;
            };
            return _$rapyd$_anonfunc;
        })()
    },
    "size": {
        "get": (function() {
            var _$rapyd$_anonfunc = function () {
                return this.jsmap.size;
            };
            return _$rapyd$_anonfunc;
        })()
    }
});
_$rapyd$_dict.prototype.__len__ = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.size;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (x) {
        return this.jsmap.has(x);
    };

    _$rapyd$_anonfunc.__argnames__ = ["x"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.has = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__contains__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function (key, value) {
        this.jsmap.set(key, value);
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.set = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.__setitem__ = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.clear = (function() {
    var _$rapyd$_anonfunc = function () {
        this.jsmap.clear();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.copy = (function() {
    var _$rapyd$_anonfunc = function () {
        return _$rapyd$_dict(this);
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.keys = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.keys();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.values = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.values();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.entries();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.items = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.entries = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype[_$rapyd$_iterator_symbol] = (function() {
    var _$rapyd$_anonfunc = function () {
        return this.jsmap.keys();
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.__getitem__ = (function() {
    var _$rapyd$_anonfunc = function (key) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            throw new KeyError(key + "");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.get = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            return (defval === undefined) ? null : defval;
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.set_default = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var j;
        j = this.jsmap;
        if (!j.has(key)) {
            j.set(key, defval);
            return defval;
        }
        return j.get(key);
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        var iterable = ( 0 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true) ? undefined : arguments[0];
        var value = (arguments[1] === undefined || ( 1 === arguments.length-1 && arguments[arguments.length-1] !== null && typeof arguments[arguments.length-1] === "object" && arguments[arguments.length-1] [_$rapyd$_kwargs_symbol] === true)) ? _$rapyd$_anonfunc.__defaults__.value : arguments[1];
        var _$rapyd$_kwargs_obj = arguments[arguments.length-1];
        if (_$rapyd$_kwargs_obj === null || typeof _$rapyd$_kwargs_obj !== "object" || _$rapyd$_kwargs_obj [_$rapyd$_kwargs_symbol] !== true) _$rapyd$_kwargs_obj = {};
        if (Object.prototype.hasOwnProperty.call(_$rapyd$_kwargs_obj, "value")){
            value = _$rapyd$_kwargs_obj.value;
        }
        var ans, iterator, r;
        ans = _$rapyd$_dict();
        iterator = iter(iterable);
        r = iterator.next();
        while (!r.done) {
            ans.set(r.value, value);
            r = iterator.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__defaults__ = {
        value:null
    };

    _$rapyd$_anonfunc.__handles_kwarg_interpolation__ = true;

    _$rapyd$_anonfunc.__argnames__ = ["iterable", "value"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.fromkeys = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.fromkeys = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.pop = (function() {
    var _$rapyd$_anonfunc = function (key, defval) {
        var ans;
        ans = this.jsmap.get(key);
        if (ans === undefined && !this.jsmap.has(key)) {
            if (defval === undefined) {
                throw new KeyError(key);
            }
            return defval;
        }
        this.jsmap.delete(key);
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["key", "defval"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.popitem = (function() {
    var _$rapyd$_anonfunc = function () {
        var r;
        r = this.jsmap.entries().next();
        if (r.done) {
            throw new KeyError("dict is empty");
        }
        this.jsmap.delete(r.value[0]);
        return r.value;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.update = (function() {
    var _$rapyd$_anonfunc = function () {
        var m, iterable, iterator, result, keys;
        if (arguments.length === 0) {
            return;
        }
        m = this.jsmap;
        iterable = arguments[0];
        if (Array.isArray(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                m.set(iterable[i][0], iterable[i][1]);
            }
        } else if (iterable instanceof _$rapyd$_dict) {
            iterator = iterable.items();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else if (typeof Map === "function" && iterable instanceof Map) {
            iterator = iterable.entries();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else if (typeof iterable[_$rapyd$_iterator_symbol] === "function") {
            iterator = iterable[_$rapyd$_iterator_symbol]();
            result = iterator.next();
            while (!result.done) {
                m.set(result.value[0], result.value[1]);
                result = iterator.next();
            }
        } else {
            keys = Object.keys(iterable);
            for (var j=0; j < keys.length; j++) {
                if (keys[j] !== _$rapyd$_iterator_symbol) {
                    m.set(keys[j], iterable[keys[j]]);
                }
            }
        }
        if (arguments.length > 1) {
            _$rapyd$_dict.prototype.update.call(this, arguments[1]);
        }
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_chain_assign_temp = (function() {
    var _$rapyd$_anonfunc = function () {
        var entries, iterator, r;
        entries = [];
        iterator = this.jsmap.entries();
        r = iterator.next();
        while (!r.done) {
            entries.push(r.value[0] + ": " + r.value[1]);
            r = iterator.next();
        }
        return "{" + entries.join(", ") + "}";
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.toString = _$rapyd$_chain_assign_temp;
_$rapyd$_dict.prototype.inspect = _$rapyd$_chain_assign_temp;
;
_$rapyd$_dict.prototype.__eq__ = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var iterator, r, x;
        if (!(other instanceof this.constructor)) {
            return false;
        }
        if (other.size !== this.size) {
            return false;
        }
        if (other.size === 0) {
            return true;
        }
        iterator = other.items();
        r = iterator.next();
        while (!r.done) {
            x = this.jsmap.get(r.value[0]);
            if (x === undefined && !this.jsmap.has(r.value[0]) || x !== r.value[1]) {
                return false;
            }
            r = iterator.next();
        }
        return true;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_dict.prototype.as_object = (function() {
    var _$rapyd$_anonfunc = function (other) {
        var ans, iterator, r;
        ans = {};
        iterator = this.jsmap.entries();
        r = iterator.next();
        while (!r.done) {
            ans[r.value[0]] = r.value[1];
            r = iterator.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["other"];
    return _$rapyd$_anonfunc;
})();
function _$rapyd$_dict_wrap(x) {
    var ans;
    ans = new _$rapyd$_dict;
    ans.jsmap = x;
    return ans;
};

_$rapyd$_dict_wrap.__argnames__ = ["x"];

var dict = _$rapyd$_dict, dict_wrap = _$rapyd$_dict_wrap;;
var Exception = Error;
function AttributeError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    AttributeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(AttributeError, Error);
AttributeError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

AttributeError.prototype.__init__.__argnames__ = ["msg"];
AttributeError.__argnames__ = AttributeError.prototype.__init__.__argnames__;
AttributeError.__handles_kwarg_interpolation__ = AttributeError.prototype.__init__.__handles_kwarg_interpolation__;
AttributeError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "AttributeError" + " #" + this._$rapyd$_object_id + ">";
};
AttributeError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
AttributeError.prototype.name = "AttributeError";

function IndexError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    IndexError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(IndexError, Error);
IndexError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

IndexError.prototype.__init__.__argnames__ = ["msg"];
IndexError.__argnames__ = IndexError.prototype.__init__.__argnames__;
IndexError.__handles_kwarg_interpolation__ = IndexError.prototype.__init__.__handles_kwarg_interpolation__;
IndexError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "IndexError" + " #" + this._$rapyd$_object_id + ">";
};
IndexError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
IndexError.prototype.name = "IndexError";

function KeyError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    KeyError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(KeyError, Error);
KeyError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

KeyError.prototype.__init__.__argnames__ = ["msg"];
KeyError.__argnames__ = KeyError.prototype.__init__.__argnames__;
KeyError.__handles_kwarg_interpolation__ = KeyError.prototype.__init__.__handles_kwarg_interpolation__;
KeyError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "KeyError" + " #" + this._$rapyd$_object_id + ">";
};
KeyError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
KeyError.prototype.name = "KeyError";

function ValueError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    ValueError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(ValueError, Error);
ValueError.prototype.__init__ = function __init__(msg) {
    var self = this;
    self.message = msg;
    self.stack = (new Error).stack;
};

ValueError.prototype.__init__.__argnames__ = ["msg"];
ValueError.__argnames__ = ValueError.prototype.__init__.__argnames__;
ValueError.__handles_kwarg_interpolation__ = ValueError.prototype.__init__.__handles_kwarg_interpolation__;
ValueError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "ValueError" + " #" + this._$rapyd$_object_id + ">";
};
ValueError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
ValueError.prototype.name = "ValueError";

function UnicodeDecodeError() {
    if (this._$rapyd$_object_id === undefined) Object.defineProperty(this, "_$rapyd$_object_id", {"value":++_$rapyd$_object_counter});
    UnicodeDecodeError.prototype.__init__.apply(this, arguments);
}
_$rapyd$_extends(UnicodeDecodeError, ValueError);
UnicodeDecodeError.prototype.__init__ = function __init__ () {
    ValueError.prototype.__init__ && ValueError.prototype.__init__.apply(this, arguments);
};
UnicodeDecodeError.prototype.__repr__ = function __repr__ () {
    return "<" + __name__ + "." + "UnicodeDecodeError" + " #" + this._$rapyd$_object_id + ">";
};
UnicodeDecodeError.prototype.__str__ = function __str__ () {
    return this.__repr__();
};
UnicodeDecodeError.prototype.name = "UnicodeDecodeError";
;
function sum(iterable, start) {
    var ans, iterator, r;
    if (Array.isArray(iterable)) {
        return iterable.reduce((function() {
            var _$rapyd$_anonfunc = function (prev, cur) {
                return prev + cur;
            };

            _$rapyd$_anonfunc.__argnames__ = ["prev", "cur"];
            return _$rapyd$_anonfunc;
        })(), start || 0);
    }
    ans = start || 0;
    iterator = iter(iterable);
    r = iterator.next();
    while (!r.done) {
        ans += r.value;
        r = iterator.next();
    }
    return ans;
};

sum.__argnames__ = ["iterable", "start"];

function map() {
    var func, iterators, args;
    func = arguments[0];
    iterators = new Array(arguments.length - 1);
    args = new Array(arguments.length - 1);
    for (var i = 1; i < arguments.length; i++) {
        iterators[i - 1] = iter(arguments[i]);
    }
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_func"] = func;
        _$rapyd$_d["_iterators"] = iterators;
        _$rapyd$_d["_args"] = args;
        _$rapyd$_d["next"] = (function() {
            var _$rapyd$_anonfunc = function () {
                var r;
                for (var i = 0; i < this._iterators.length; i++) {
                    r = this._iterators[i].next();
                    if (r.done) {
                        return {
                            "done": true
                        };
                    }
                    this._args[i] = r.value;
                }
                return {
                    "done": false,
                    "value": this._func.apply(undefined, this._args)
                };
            };
            return _$rapyd$_anonfunc;
        })();
        _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
            var _$rapyd$_anonfunc = function () {
                return this;
            };
            return _$rapyd$_anonfunc;
        })();
        return _$rapyd$_d;
    })();
};

function filter(func_or_none, iterable) {
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_iterator"] = iter(iterable);
        _$rapyd$_d["_func"] = (func_or_none === null) ? bool : func_or_none;
        _$rapyd$_d["next"] = (function() {
            var _$rapyd$_anonfunc = function () {
                var r;
                r = this._iterator.next();
                while (!r.done) {
                    if (this._func(r.value)) {
                        return r;
                    }
                    r = this._iterator.next();
                }
                return {
                    "done": true
                };
            };
            return _$rapyd$_anonfunc;
        })();
        _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
            var _$rapyd$_anonfunc = function () {
                return this;
            };
            return _$rapyd$_anonfunc;
        })();
        return _$rapyd$_d;
    })();
};

filter.__argnames__ = ["func_or_none", "iterable"];

function zip() {
    var iterators;
    iterators = new Array(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        iterators[i] = iter(arguments[i]);
    }
    return (function(){
        var _$rapyd$_d = {};
        _$rapyd$_d["_iterators"] = iterators;
        _$rapyd$_d["next"] = (function() {
            var _$rapyd$_anonfunc = function () {
                var args, r;
                args = new Array(this._iterators.length);
                for (var i = 0; i < this._iterators.length; i++) {
                    r = this._iterators[i].next();
                    if (r.done) {
                        return {
                            "done": true
                        };
                    }
                    args[i] = r.value;
                }
                return {
                    "done": false,
                    "value": args
                };
            };
            return _$rapyd$_anonfunc;
        })();
        _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
            var _$rapyd$_anonfunc = function () {
                return this;
            };
            return _$rapyd$_anonfunc;
        })();
        return _$rapyd$_d;
    })();
};
;
function _$rapyd$_repr_js_builtin(x, as_array) {
    var ans, b, keys, key;
    ans = [];
    b = "{}";
    if (as_array) {
        b = "[]";
        for (var i = 0; i < x.length; i++) {
            ans.push(_$rapyd$_repr(x[i]));
        }
    } else {
        keys = Object.keys(x);
        for (var k = 0; k < keys.length; k++) {
            key = keys[k];
            ans.push(JSON.stringify(key) + ":" + _$rapyd$_repr(x[key]));
        }
    }
    return b[0] + ans.join(", ") + b[1];
};

_$rapyd$_repr_js_builtin.__argnames__ = ["x", "as_array"];

function _$rapyd$_repr(x) {
    var ans, name;
    if (x === null) {
        return "None";
    }
    if (x === undefined) {
        return "undefined";
    }
    ans = x;
    if (typeof x.__repr__ === "function") {
        ans = x.__repr__();
    } else if (x === true || x === false) {
        ans = (x) ? "True" : "False";
    } else if (Array.isArray(x)) {
        ans = _$rapyd$_repr_js_builtin(x, true);
    } else if (typeof x === "function") {
        ans = x.toString();
    } else {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (_$rapyd$_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var _$rapyd$_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };

                _$rapyd$_anonfunc.__argnames__ = ["i"];
                return _$rapyd$_anonfunc;
            })()).join(", ") + "])";
        }
        ans = (typeof x.toString === "function") ? x.toString() : x;
        if (ans === "[object Object]") {
            return _$rapyd$_repr_js_builtin(x);
        }
        try {
            ans = JSON.stringify(x);
        } catch (_$rapyd$_Exception) {
        }
    }
    return ans + "";
};

_$rapyd$_repr.__argnames__ = ["x"];

function _$rapyd$_str(x) {
    var ans, name;
    if (x === null) {
        return "None";
    }
    if (x === undefined) {
        return "undefined";
    }
    ans = x;
    if (typeof x.__str__ === "function") {
        ans = x.__str__();
    } else if (typeof x.__repr__ === "function") {
        ans = x.__repr__();
    } else if (x === true || x === false) {
        ans = (x) ? "True" : "False";
    } else if (Array.isArray(x)) {
        ans = _$rapyd$_repr_js_builtin(x, true);
    } else if (typeof x.toString === "function") {
        name = Object.prototype.toString.call(x).slice(8, -1);
        if (_$rapyd$_not_equals("Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".indexOf(name), -1)) {
            return name + "([" + x.map((function() {
                var _$rapyd$_anonfunc = function (i) {
                    return str.format("0x{:02x}", i);
                };

                _$rapyd$_anonfunc.__argnames__ = ["i"];
                return _$rapyd$_anonfunc;
            })()).join(", ") + "])";
        }
        ans = x.toString();
        if (ans === "[object Object]") {
            ans = _$rapyd$_repr_js_builtin(x);
        }
    }
    return ans + "";
};

_$rapyd$_str.__argnames__ = ["x"];

_$rapyd$_str.format = (function() {
    var _$rapyd$_anonfunc = function () {
        var template, args, kwargs, explicit, implicit, _$rapyd$_chain_assign_temp, idx, ans, pos, in_brace, markup, ch;
        template = arguments[0];
        if (template === undefined) {
            throw new TypeError("Template is required");
        }
        args = Array.prototype.slice.call(arguments, 1);
        kwargs = {};
        if (args.length && args[args.length-1][_$rapyd$_kwargs_symbol] !== undefined) {
            kwargs = args[args.length-1];
            args = args.slice(0, -1);
        }
        _$rapyd$_chain_assign_temp = false;
        explicit = _$rapyd$_chain_assign_temp;
        implicit = _$rapyd$_chain_assign_temp;
;
        idx = 0;
        if (_$rapyd$_str.format._template_resolve_pat === undefined) {
            _$rapyd$_str.format._template_resolve_pat = /[.\[]/;
        }
        function resolve(arg, object) {
            var _$rapyd$_unpack, first, key, rest, ans;
            if (!arg) {
                return object;
            }
            _$rapyd$_unpack = [arg[0], arg.slice(1)];
            first = _$rapyd$_unpack[0];
            arg = _$rapyd$_unpack[1];
            key = arg.split(_$rapyd$_str.format._template_resolve_pat, 1)[0];
            rest = arg.slice(key.length);
            ans = (first === "[") ? object[key.slice(0, -1)] : getattr(object, key);
            if (ans === undefined) {
                throw new KeyError((first === "[") ? key.slice(0, -1) : key);
            }
            return resolve(rest, ans);
        };

        resolve.__argnames__ = ["arg", "object"];

        function resolve_format_spec(format_spec) {
            if (_$rapyd$_str.format._template_resolve_fs_pat === undefined) {
                _$rapyd$_str.format._template_resolve_fs_pat = /[{]([a-zA-Z0-9_]+)[}]/g;
            }
            return format_spec.replace(_$rapyd$_str.format._template_resolve_fs_pat, (function() {
                var _$rapyd$_anonfunc = function (match, key) {
                    if (!Object.prototype.hasOwnProperty.call(kwargs, key)) {
                        return "";
                    }
                    return "" + kwargs[key];
                };

                _$rapyd$_anonfunc.__argnames__ = ["match", "key"];
                return _$rapyd$_anonfunc;
            })());
        };

        resolve_format_spec.__argnames__ = ["format_spec"];

        function apply_formatting(value, format_spec) {
            var _$rapyd$_unpack, fill, align, sign, fhash, zeropad, width, comma, precision, ftype, is_numeric, is_int, lftype, code, exp, nval, is_positive, left, right;
            if (format_spec.indexOf("{") !== -1) {
                format_spec = resolve_format_spec(format_spec);
            }
            if (_$rapyd$_str.format._template_format_pat === undefined) {
                _$rapyd$_str.format._template_format_pat = /([^{}](?=[<>=^]))?([<>=^])?([-+\x20])?(\#)?(0)?(\d+)?(,)?(?:\.(\d+))?([bcdeEfFgGnosxX%])?/;
            }
            try {
                _$rapyd$_unpack = format_spec.match(_$rapyd$_str.format._template_format_pat).slice(1);
                fill = _$rapyd$_unpack[0];
                align = _$rapyd$_unpack[1];
                sign = _$rapyd$_unpack[2];
                fhash = _$rapyd$_unpack[3];
                zeropad = _$rapyd$_unpack[4];
                width = _$rapyd$_unpack[5];
                comma = _$rapyd$_unpack[6];
                precision = _$rapyd$_unpack[7];
                ftype = _$rapyd$_unpack[8];
            } catch (_$rapyd$_Exception) {
                if (_$rapyd$_Exception instanceof TypeError) {
                    return value;
                } else {
                    throw _$rapyd$_Exception;
                }
            }
            if (zeropad) {
                fill = fill || "0";
                align = align || "=";
            } else {
                fill = fill || " ";
                align = align || ">";
            }
            is_numeric = Number(value) === value;
            is_int = is_numeric && value % 1 === 0;
            precision = parseInt(precision, 10);
            lftype = (ftype || "").toLowerCase();
            if (ftype === "n") {
                is_numeric = true;
                if (is_int) {
                    if (comma) {
                        throw new ValueError("Cannot specify ',' with 'n'");
                    }
                    value = parseInt(value, 10).toLocaleString();
                } else {
                    value = parseFloat(value).toLocaleString();
                }
            } else if (['b', 'c', 'd', 'o', 'x'].indexOf(lftype) !== -1) {
                value = parseInt(value, 10);
                is_numeric = true;
                if (!isNaN(value)) {
                    if (ftype === "b") {
                        value = (value >>> 0).toString(2);
                        if (fhash) {
                            value = "0b" + value;
                        }
                    } else if (ftype === "c") {
                        if (value > 65535) {
                            code = value - 65536;
                            value = String.fromCharCode(55296 + (code >> 10), 56320 + (code & 1023));
                        } else {
                            value = String.fromCharCode(value);
                        }
                    } else if (ftype === "d") {
                        if (comma) {
                            value = value.toLocaleString("en-US");
                        } else {
                            value = value.toString(10);
                        }
                    } else if (ftype === "o") {
                        value = value.toString(8);
                        if (fhash) {
                            value = "0o" + value;
                        }
                    } else if (lftype === "x") {
                        value = value.toString(16);
                        value = (ftype === "x") ? value.toLowerCase() : value.toUpperCase();
                        if (fhash) {
                            value = "0x" + value;
                        }
                    }
                }
            } else if (['e','f','g','%'].indexOf(lftype) !== -1) {
                is_numeric = true;
                value = parseFloat(value);
                if (lftype === "e") {
                    value = value.toExponential((isNaN(precision)) ? 6 : precision);
                    value = (ftype === "E") ? value.toUpperCase() : value.toLowerCase();
                } else if (lftype === "f") {
                    value = value.toFixed((isNaN(precision)) ? 6 : precision);
                    value = (ftype === "F") ? value.toUpperCase() : value.toLowerCase();
                } else if (ftype === "%") {
                    value *= 100;
                    value = value.toFixed((isNaN(precision)) ? 6 : precision) + "%";
                } else if (lftype === "g") {
                    if (isNaN(precision)) {
                        precision = 6;
                    }
                    precision = max(1, precision);
                    exp = parseInt(value.toExponential(precision - 1).toLowerCase().split("e")[1], 10);
                    if (-4 <= exp && exp < precision) {
                        value = value.toFixed(precision - 1 - exp);
                    } else {
                        value = value.toExponential(precision - 1);
                    }
                    value = value.replace(/0+$/g, "");
                    if (value[value.length-1] === ".") {
                        value = value.slice(0, -1);
                    }
                    if (ftype === "G") {
                        value = value.toUpperCase();
                    }
                }
            } else {
                value += "";
                if (!isNaN(precision)) {
                    value = value.slice(0, precision);
                }
            }
            value += "";
            if (is_numeric && sign) {
                nval = Number(value);
                is_positive = !isNaN(nval) && nval >= 0;
                if (is_positive && (sign === " " || sign === "+")) {
                    value = sign + value;
                }
            }
            function repeat(char, num) {
                return (new Array(num+1)).join(char);
            };

            repeat.__argnames__ = ["char", "num"];

            if (is_numeric && width && width[0] === "0") {
                width = width.slice(1);
                _$rapyd$_unpack = ["0", "="];
                fill = _$rapyd$_unpack[0];
                align = _$rapyd$_unpack[1];
            }
            width = parseInt(width || "-1", 10);
            if (isNaN(width)) {
                throw new ValueError("Invalid width specification: " + width);
            }
            if (fill && value.length < width) {
                if (align === "<") {
                    value = value + repeat(fill, width - value.length);
                } else if (align === ">") {
                    value = repeat(fill, width - value.length) + value;
                } else if (align === "^") {
                    left = Math.floor((width - value.length) / 2);
                    right = width - left - value.length;
                    value = repeat(fill, left) + value + repeat(fill, right);
                } else if (align === "=") {
                    if (_$rapyd$_in(value[0], "+- ")) {
                        value = value[0] + repeat(fill, width - value.length) + value.slice(1);
                    } else {
                        value = repeat(fill, width - value.length) + value;
                    }
                } else {
                    throw new ValueError("Unrecognized alignment: " + align);
                }
            }
            return value;
        };

        apply_formatting.__argnames__ = ["value", "format_spec"];

        function parse_markup(markup) {
            var key, transformer, format_spec, _$rapyd$_chain_assign_temp, pos, state, ch;
            _$rapyd$_chain_assign_temp = "";
            key = _$rapyd$_chain_assign_temp;
            transformer = _$rapyd$_chain_assign_temp;
            format_spec = _$rapyd$_chain_assign_temp;
;
            pos = 0;
            state = 0;
            while (pos < markup.length) {
                ch = markup[pos];
                if (state === 0) {
                    if (ch === "!") {
                        state = 1;
                    } else if (ch === ":") {
                        state = 2;
                    } else {
                        key += ch;
                    }
                } else if (state === 1) {
                    if (ch === ":") {
                        state = 2;
                    } else {
                        transformer += ch;
                    }
                } else {
                    format_spec += ch;
                }
                pos += 1;
            }
            return [key, transformer, format_spec];
        };

        parse_markup.__argnames__ = ["markup"];

        function render_markup(markup) {
            var _$rapyd$_unpack, key, transformer, format_spec, lkey, nvalue, object, ans;
            _$rapyd$_unpack = parse_markup(markup);
            key = _$rapyd$_unpack[0];
            transformer = _$rapyd$_unpack[1];
            format_spec = _$rapyd$_unpack[2];
            if (transformer && ['a', 'r', 's'].indexOf(transformer) === -1) {
                throw new ValueError("Unknown conversion specifier: " + transformer);
            }
            lkey = key.length && key.split(/[.\[]/, 1)[0];
            if (lkey) {
                explicit = true;
                if (implicit) {
                    throw new ValueError("cannot switch from automatic field numbering to manual field specification");
                }
                nvalue = parseInt(lkey);
                object = (isNaN(nvalue)) ? kwargs[lkey] : args[nvalue];
                if (object === undefined) {
                    if (isNaN(nvalue)) {
                        throw new KeyError(lkey);
                    }
                    throw new IndexError(lkey);
                }
                object = resolve(key.slice(lkey.length), object);
            } else {
                implicit = true;
                if (explicit) {
                    throw new ValueError("cannot switch from manual field specification to automatic field numbering");
                }
                if (idx >= args.length) {
                    throw new IndexError("Not enough arguments to match template: " + template);
                }
                object = args[idx];
                idx += 1;
            }
            if (typeof object === "function") {
                object = object();
            }
            ans = "" + object;
            if (format_spec) {
                ans = apply_formatting(ans, format_spec);
            }
            return ans;
        };

        render_markup.__argnames__ = ["markup"];

        ans = "";
        pos = 0;
        in_brace = 0;
        markup = "";
        while (pos < template.length) {
            ch = template[pos];
            if (in_brace) {
                if (ch === "{") {
                    in_brace += 1;
                    markup += "{";
                } else if (ch === "}") {
                    in_brace -= 1;
                    if (in_brace > 0) {
                        markup += "}";
                    } else {
                        ans += render_markup(markup);
                    }
                } else {
                    markup += ch;
                }
            } else {
                if (ch === "{") {
                    if (template[pos + 1] === "{") {
                        pos += 1;
                        ans += "{";
                    } else {
                        in_brace = 1;
                        markup = "";
                    }
                } else {
                    ans += ch;
                }
            }
            pos += 1;
        }
        if (in_brace) {
            throw new ValueError("expected '}' before end of string");
        }
        return ans;
    };
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.capitalize = (function() {
    var _$rapyd$_anonfunc = function (string) {
        if (string) {
            string = string[0].toUpperCase() + string.slice(1).toLowerCase();
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.center = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        var left, right;
        left = Math.floor((width - string.length) / 2);
        right = width - left - string.length;
        fill = fill || " ";
        return new Array(left+1).join(fill) + string + new Array(right+1).join(fill);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.count = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var _$rapyd$_unpack, pos, step, ans;
        start = start || 0;
        end = end || string.length;
        if (start < 0 || end < 0) {
            string = string.slice(start, end);
            _$rapyd$_unpack = [0, string.length];
            start = _$rapyd$_unpack[0];
            end = _$rapyd$_unpack[1];
        }
        pos = start;
        step = needle.length;
        ans = 0;
        while (pos !== -1) {
            pos = string.indexOf(needle, pos);
            if (pos !== -1) {
                ans += 1;
                pos += step;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.endswith = (function() {
    var _$rapyd$_anonfunc = function (string, suffixes, start, end) {
        var q;
        start = start || 0;
        if (typeof suffixes === "string") {
            suffixes = [suffixes];
        }
        if (end !== undefined) {
            string = string.slice(0, end);
        }
        for (var i = 0; i < suffixes.length; i++) {
            q = suffixes[i];
            if (string.indexOf(q, Math.max(start, string.length - q.length)) !== -1) {
                return true;
            }
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "suffixes", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.startswith = (function() {
    var _$rapyd$_anonfunc = function (string, prefixes, start, end) {
        var prefix;
        start = start || 0;
        if (typeof prefixes === "string") {
            prefixes = [prefixes];
        }
        for (var i = 0; i < prefixes.length; i++) {
            prefix = prefixes[i];
            end = (end === undefined) ? string.length : end;
            if (end - start >= prefix.length && prefix === string.slice(start, start + prefix.length)) {
                return true;
            }
        }
        return false;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "prefixes", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.find = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        while (start < 0) {
            start += string.length;
        }
        ans = string.indexOf(needle, start);
        if (end !== undefined && ans !== -1) {
            while (end < 0) {
                end += string.length;
            }
            if (ans >= end - needle.length) {
                return -1;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rfind = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        while (end < 0) {
            end += string.length;
        }
        ans = string.lastIndexOf(needle, end - 1);
        if (start !== undefined && ans !== -1) {
            while (start < 0) {
                start += string.length;
            }
            if (ans < start) {
                return -1;
            }
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.index = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        ans = _$rapyd$_str.find.apply(null, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rindex = (function() {
    var _$rapyd$_anonfunc = function (string, needle, start, end) {
        var ans;
        ans = _$rapyd$_str.rfind.apply(null, arguments);
        if (ans === -1) {
            throw new ValueError("substring not found");
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "needle", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.islower = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && string.toUpperCase() !== string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.isupper = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && string.toLowerCase() !== string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.isspace = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.length > 0 && /^\s+$/.test(string);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.join = (function() {
    var _$rapyd$_anonfunc = function (string, iterable) {
        var ans, r;
        if (Array.isArray(iterable)) {
            return iterable.join(string);
        }
        ans = "";
        r = iterable.next();
        while (!r.done) {
            if (ans) {
                ans += string;
            }
            ans += r.value;
            r = iterable.next();
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "iterable"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ljust = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        if (width > string.length) {
            fill = fill || " ";
            string += new Array(width - string.length + 1).join(fill);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rjust = (function() {
    var _$rapyd$_anonfunc = function (string, width, fill) {
        if (width > string.length) {
            fill = fill || " ";
            string = new Array(width - string.length + 1).join(fill) + string;
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width", "fill"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.lower = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.toLowerCase();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.upper = (function() {
    var _$rapyd$_anonfunc = function (string) {
        return string.toUpperCase();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.lstrip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        var pos;
        pos = 0;
        chars = chars || _$rapyd$_str.whitespace;
        while (chars.indexOf(string[pos]) !== -1) {
            pos += 1;
        }
        if (pos) {
            string = string.slice(pos);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rstrip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        var pos;
        pos = string.length - 1;
        chars = chars || _$rapyd$_str.whitespace;
        while (chars.indexOf(string[pos]) !== -1) {
            pos -= 1;
        }
        if (pos < string.length - 1) {
            string = string.slice(0, pos + 1);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.strip = (function() {
    var _$rapyd$_anonfunc = function (string, chars) {
        return _$rapyd$_str.lstrip(_$rapyd$_str.rstrip(string, chars), chars);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "chars"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.partition = (function() {
    var _$rapyd$_anonfunc = function (string, sep) {
        var idx;
        idx = string.indexOf(sep);
        if (idx === -1) {
            return [string, "", ""];
        }
        return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rpartition = (function() {
    var _$rapyd$_anonfunc = function (string, sep) {
        var idx;
        idx = string.lastIndexOf(sep);
        if (idx === -1) {
            return ["", "", string];
        }
        return [string.slice(0, idx), sep, string.slice(idx + sep.length)];
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.replace = (function() {
    var _$rapyd$_anonfunc = function (string, old, repl, count) {
        var pos, idx;
        if (count === 1) {
            return string.replace(old, repl);
        }
        if (count < 1) {
            return string;
        }
        count = count || Number.MAX_VALUE;
        pos = 0;
        while (count > 0) {
            count -= 1;
            idx = string.indexOf(old, pos);
            if (idx === -1) {
                break;
            }
            pos = idx + repl.length;
            string = string.slice(0, idx) + repl + string.slice(idx + old.length);
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "old", "repl", "count"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.split = (function() {
    var _$rapyd$_anonfunc = function (string, sep, maxsplit) {
        var ans, extra, parts;
        if (maxsplit === 0) {
            return _$rapyd$_list_decorate([ string ]);
        }
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = string.split(/(\s+)/);
                extra = "";
                parts = [];
                for (var i = 0; i < ans.length; i++) {
                    if (parts.length >= maxsplit + 1) {
                        extra += ans[i];
                    } else if (i % 2 === 0) {
                        parts.push(ans[i]);
                    }
                }
                parts[parts.length-1] += extra;
                ans = parts;
            } else {
                ans = string.split(/\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = string.split(sep);
            if (maxsplit > 0 && ans.length > maxsplit) {
                extra = ans.slice(maxsplit).join(sep);
                ans = ans.slice(0, maxsplit);
                ans.push(extra);
            }
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep", "maxsplit"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.rsplit = (function() {
    var _$rapyd$_anonfunc = function (string, sep, maxsplit) {
        var ans, is_space, pos, current, spc, ch, end, _$rapyd$_chain_assign_temp, idx;
        if (!maxsplit) {
            return _$rapyd$_str.split.call(null, string, sep, maxsplit);
        }
        if (sep === undefined || sep === null) {
            if (maxsplit > 0) {
                ans = [];
                is_space = /\s/;
                pos = string.length - 1;
                current = "";
                while (pos > -1 && maxsplit > 0) {
                    spc = false;
                    ch = string[pos];
                    while (pos > -1 && is_space.test(ch)) {
                        spc = true;
                        ch = string[--pos];
                    }
                    if (spc) {
                        if (current) {
                            ans.push(current);
                            maxsplit -= 1;
                        }
                        current = ch;
                    } else {
                        current += ch;
                    }
                    pos -= 1;
                }
                ans.push(string.slice(0, pos + 1) + current);
                ans.reverse();
            } else {
                ans = string.split(/\s+/);
            }
        } else {
            if (sep === "") {
                throw new ValueError("empty separator");
            }
            ans = [];
            _$rapyd$_chain_assign_temp = string.length;
            pos = _$rapyd$_chain_assign_temp;
            end = _$rapyd$_chain_assign_temp;
;
            while (pos > -1 && maxsplit > 0) {
                maxsplit -= 1;
                idx = string.lastIndexOf(sep, pos);
                if (idx === -1) {
                    break;
                }
                ans.push(string.slice(idx + sep.length, end));
                pos = idx - 1;
                end = idx;
            }
            ans.push(string.slice(0, end));
            ans.reverse();
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "sep", "maxsplit"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.splitlines = (function() {
    var _$rapyd$_anonfunc = function (string, keepends) {
        var parts, ans;
        if (keepends) {
            parts = string.split(/((?:\r?\n)|\r)/);
            ans = [];
            for (var i = 0; i < parts.length; i++) {
                if (i % 2 === 0) {
                    ans.push(parts[i]);
                } else {
                    ans[ans.length-1] += parts[i];
                }
            }
        } else {
            ans = string.split(/(?:\r?\n)|\r/);
        }
        return _$rapyd$_list_decorate(ans);
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "keepends"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.swapcase = (function() {
    var _$rapyd$_anonfunc = function (string) {
        var ans, a, b;
        ans = new Array(string.length);
        for (var i = 0; i < ans.length; i++) {
            a = string[i];
            b = a.toLowerCase();
            if (a === b) {
                b = a.toUpperCase();
            }
            ans[i] = b;
        }
        return ans.join("");
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.zfill = (function() {
    var _$rapyd$_anonfunc = function (string, width) {
        if (width > string.length) {
            string = new Array(width - string.length + 1).join("0") + string;
        }
        return string;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "width"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.uchrs = (function() {
    var _$rapyd$_anonfunc = function (string, with_positions) {
        return (function(){
            var _$rapyd$_d = {};
            _$rapyd$_d["_string"] = string;
            _$rapyd$_d["_pos"] = 0;
            _$rapyd$_d[_$rapyd$_iterator_symbol] = (function() {
                var _$rapyd$_anonfunc = function () {
                    return this;
                };
                return _$rapyd$_anonfunc;
            })();
            _$rapyd$_d["next"] = (function() {
                var _$rapyd$_anonfunc = function () {
                    var length, pos, value, ans, extra;
                    length = this._string.length;
                    if (this._pos >= length) {
                        return {
                            "done": true
                        };
                    }
                    pos = this._pos;
                    value = this._string.charCodeAt(this._pos++);
                    ans = "\ufffd";
                    if (55296 <= value && value <= 56319) {
                        if (this._pos < length) {
                            extra = this._string.charCodeAt(this._pos++);
                            if ((extra & 56320) === 56320) {
                                ans = String.fromCharCode(value, extra);
                            }
                        }
                    } else if ((value & 56320) !== 56320) {
                        ans = String.fromCharCode(value);
                    }
                    if (with_positions) {
                        return {
                            "done": false,
                            "value": _$rapyd$_list_decorate([ pos, ans ])
                        };
                    } else {
                        return {
                            "done": false,
                            "value": ans
                        };
                    }
                };
                return _$rapyd$_anonfunc;
            })();
            return _$rapyd$_d;
        })();
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "with_positions"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.uslice = (function() {
    var _$rapyd$_anonfunc = function (string, start, end) {
        var items, iterator, r;
        items = [];
        iterator = _$rapyd$_str.uchrs(string);
        r = iterator.next();
        while (!r.done) {
            items.push(r.value);
            r = iterator.next();
        }
        return items.slice(start || 0, (end === undefined) ? items.length : end).join("");
    };

    _$rapyd$_anonfunc.__argnames__ = ["string", "start", "end"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ulen = (function() {
    var _$rapyd$_anonfunc = function (string) {
        var iterator, r, ans;
        iterator = _$rapyd$_str.uchrs(string);
        r = iterator.next();
        ans = 0;
        while (!r.done) {
            r = iterator.next();
            ans += 1;
        }
        return ans;
    };

    _$rapyd$_anonfunc.__argnames__ = ["string"];
    return _$rapyd$_anonfunc;
})();
_$rapyd$_str.ascii_lowercase = "abcdefghijklmnopqrstuvwxyz";
_$rapyd$_str.ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.ascii_letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
_$rapyd$_str.digits = "0123456789";
_$rapyd$_str.punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
_$rapyd$_str.printable = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ \t\n\r\u000b\f";
_$rapyd$_str.whitespace = " \t\n\r\u000b\f";
var str = _$rapyd$_str, repr = _$rapyd$_repr;;
var _$rapyd$_regenerator = {};
!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; 

  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {

      module.exports = runtime;
    }

    return;
  }

  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {

    var generator = Object.create((outerFn || Generator).prototype);

    generator._invoke = makeInvokeMethod(
      innerFn, self || null,
      new Context(tryLocsList || [])
    );

    return generator;
  }
  runtime.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  var ContinueSentinel = {};

  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||

        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {

    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {

            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      var enqueueResult =

        previousPromise ? previousPromise.then(function() {
          return invoke(method, arg);
        }) : new Promise(function(resolve) {
          resolve(invoke(method, arg));
        });

      previousPromise = enqueueResult["catch"](function(ignored){});

      return enqueueResult;
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter 

      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {

            context.delegate = null;

            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {

                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {

              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            method = "throw";
            arg = record.arg;
            continue;
          }

          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }

        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {

            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {

          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {

              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;

          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {

    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {

          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {

          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {

        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(_$rapyd$_regenerator);
