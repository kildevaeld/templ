"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var orange_1 = require('orange');

var Reference = function () {
    function Reference(view, path, gettable, settable) {
        _classCallCheck(this, Reference);

        this.gettable = gettable;
        this.settable = settable;
        this.view = view;
        this.path = path;
    }

    Reference.prototype.value = function value(_value) {
        if (arguments.length === 0) {
            return this.gettable ? this.view.get(this.path) : void 0;
        }
        if (this.settable) this.view.set(this.path, _value);
    };

    Reference.prototype.toString = function toString() {
        return this.view.get(this.path) || '';
    };

    _createClass(Reference, [{
        key: "__classType",
        get: function get() {
            return "Reference";
        }
    }]);

    return Reference;
}();

exports.Reference = Reference;

var Assignment = function () {
    function Assignment(view, path, value) {
        _classCallCheck(this, Assignment);

        this.view = view;
        this.path = path;
        this.value = value;
        this.assign = orange_1.bind(this.assign, this);
        this.toString = orange_1.bind(this.toString, this);
    }

    Assignment.prototype.assign = function assign() {
        this.view.set(this.path, this.value.call(this));
    };

    Assignment.prototype.toString = function toString() {
        var val = this.value.call(this);
        return val ? String(val) : '';
    };

    _createClass(Assignment, [{
        key: "__classType",
        get: function get() {
            return "Assignment";
        }
    }]);

    return Assignment;
}();

exports.Assignment = Assignment;

var Call = function () {
    function Call(view, keypath, params) {
        _classCallCheck(this, Call);

        this.view = view;
        this.keypath = keypath;
        this.params = params || [];
    }

    Call.prototype.call = function call() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        args = args || [];
        var fn = this.view.get(this.keypath);
        if (fn == null || typeof fn !== 'function') {
            //throw new Error("not exists or not function");
            return this.view.trigger('error', this, new Error("function does not exists or is not a function"));
        }
        return fn.apply(this.view, this.params.concat(args));
    };

    Call.prototype.toString = function toString() {
        var val = this.call();
        return val ? String(val) : '';
    };

    _createClass(Call, [{
        key: "__classType",
        get: function get() {
            return "Call";
        }
    }]);

    return Call;
}();

exports.Call = Call;
function isCall(a) {
    return a && (a instanceof Call || a.__classType === 'Call');
}
exports.isCall = isCall;
function isReference(a) {
    return a && (a instanceof Reference || a.__classType === 'Reference');
}
exports.isReference = isReference;
function isAssignment(a) {
    return a && (a instanceof Assignment || a.__classType === 'Assignment');
}
exports.isAssignment = isAssignment;