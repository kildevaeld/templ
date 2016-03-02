'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function extend(obj) {
    var a = undefined,
        k = undefined;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    for (var _iterator = args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        if (_isArray) {
            if (_i >= _iterator.length) break;
            a = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            a = _i.value;
        }

        if (a !== Object(a)) continue;
        for (k in a) {
            obj[k] = a[k];
        }
    }
    return obj;
}
exports.extend = extend;
function slice(obj) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    return Array.prototype.slice.apply(obj, args);
}
exports.slice = slice;
function extendClass(parent, protoProps, staticProps) {
    var child;
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function child() {
            return parent.apply(this, arguments);
        };
    }
    // Add static properties to the constructor function, if supplied.
    extend(child, parent, staticProps);
    // Set the prototype chain to inherit from `parent`, without calling
    // `parent` constructor function.
    var Surrogate = function Surrogate() {
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) extend(child.prototype, protoProps);
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
}
exports.extendClass = extendClass;
;
var nativeBind = Function.prototype.bind;
function bind(method, context) {
    for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
    }

    if (typeof method !== 'function') throw new Error('method not at function');
    if (nativeBind != null) return nativeBind.call.apply(nativeBind, [method, context].concat(args));
    args = args || [];
    var fnoop = function fnoop() {};
    var fBound = function fBound() {
        var ctx = this instanceof fnoop ? this : context;
        return method.apply(ctx, args.concat(slice(arguments)));
    };
    fnoop.prototype = this.prototype;
    fBound.prototype = new fnoop();
    return fBound;
}
exports.bind = bind;

var Debug = function () {
    function Debug(namespace) {
        _classCallCheck(this, Debug);

        this.enabled = false;
        this.namespace = namespace;
    }

    Debug.enable = function enable(enabled, namespace) {
        for (var k in this.loggers) {
            if (namespace && k === namespace) {
                this.loggers[k].enabled = enabled;
            } else if (!namespace) {
                this.loggers[k].enabled = enabled;
            }
        }
    };

    Debug.create = function create(namespace) {
        var logger = undefined;
        if (this.loggers[namespace]) {
            logger = this.loggers[namespace]; //.debug
        } else {
                logger = new Debug(namespace);
                this.loggers[namespace] = logger;
            }
        return bind(logger.debug, logger);
    };

    Debug.prototype.debug = function debug() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
        }

        if (!this.enabled) return;
        args[0] = this._coerce(args[0]);
        if ('string' !== typeof args[0]) {
            // anything else let's inspect with %o
            args = ['%o'].concat(args);
        }
        // apply any `formatters` transformations
        var index = 0;
        args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
            // if we encounter an escaped % then don't increase the array index
            if (match === '%%') return match;
            index++;
            var formatter = Debug.formatters[format];
            if ('function' === typeof formatter) {
                var val = args[index];
                match = formatter.call(self, val);
                // now we need to remove `args[index]` since it's inlined in the `format`
                args.splice(index, 1);
                index--;
            }
            return match;
        });
        args = this._formatArgs(args);
        this._log.apply(this, args);
    };

    Debug.prototype._log = function _log() {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
    };

    Debug.prototype._coerce = function _coerce(val) {
        if (val instanceof Error) return val.stack || val.message;
        return val;
    };

    Debug.prototype._formatArgs = function _formatArgs(args) {
        args[0] = '[templ:' + this.namespace + '] ' + args[0];
        return args;
    };

    return Debug;
}();

Debug.loggers = {};
Debug.formatters = {
    j: function j(args) {
        return JSON.stringify(args);
    }
};
exports.Debug = Debug;
function debug(namespace) {
    return Debug.create(namespace);
}
exports.debug = debug;