"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_1 = require('./base');
var view_1 = require('../view');
var utils = require('../utils');
var debug = utils.debug('attributes:event');

var EventAttribute = function (_base_1$BaseAttribute) {
    _inherits(EventAttribute, _base_1$BaseAttribute);

    function EventAttribute() {
        _classCallCheck(this, EventAttribute);

        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
    }

    EventAttribute.prototype.initialize = function initialize() {
        this._onEvent = utils.bind(this._onEvent, this);
        //if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
        //debug('added event listener %s: %o', this.event, this.value)
        //this.view.addListener(<Element>this.ref, this.event, this._onEvent)
    };

    EventAttribute.prototype._onEvent = function _onEvent(e) {
        var self = this;
        var fn = undefined;
        if (this.value instanceof view_1.Assignment) {
            fn = this.value.assign;
        } else {
            fn = this.value;
        }
        if (typeof fn !== 'function' && !(fn instanceof view_1.Call)) {
            throw new Error('[event] value is not a function or a Callable');
        }
        debug('fired event: %s', this._event);
        if (fn instanceof view_1.Call) {
            fn.call();
        } else {
            fn(e);
        }
    };

    EventAttribute.prototype.destroy = function destroy() {
        debug('removed event listener %s: %o', this._event, this.value);
        this.view.removeListener(this.ref, this._event, this._onEvent);
    };

    _createClass(EventAttribute, [{
        key: 'event',
        set: function set(event) {
            if (this._event) {
                debug('added event listener %s: %o', this._event, this.value);
                this.view.removeListener(this.ref, this._event, this._onEvent);
            }
            this._event = event;
            debug('added event listener %s: %o', this._event, this.value);
            this.view.addListener(this.ref, this._event, this._onEvent);
        },
        get: function get() {
            return this._event;
        }
    }]);

    return EventAttribute;
}(base_1.BaseAttribute);

exports.EventAttribute = EventAttribute;

var KeyCodeAttribute = function (_EventAttribute) {
    _inherits(KeyCodeAttribute, _EventAttribute);

    function KeyCodeAttribute(ref, key, value, view) {
        _classCallCheck(this, KeyCodeAttribute);

        var _this2 = _possibleConstructorReturn(this, _EventAttribute.call(this, ref, key, value, view));
        //this.event = "keydown"
        //this.keyCodes = []

        _this2.keyCodes = [];
        _this2.event = "keydown";
        return _this2;
    }

    KeyCodeAttribute.prototype._onEvent = function _onEvent(event) {
        if (! ~this.keyCodes.indexOf(event.keyCode)) {
            return;
        }
        _EventAttribute.prototype._onEvent.call(this, event);
    };

    return KeyCodeAttribute;
}(EventAttribute);

exports.KeyCodeAttribute = KeyCodeAttribute;

var ClickAttribute = function (_EventAttribute2) {
    _inherits(ClickAttribute, _EventAttribute2);

    function ClickAttribute() {
        _classCallCheck(this, ClickAttribute);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this3 = _possibleConstructorReturn(this, _EventAttribute2.call.apply(_EventAttribute2, [this].concat(args)));

        _this3.event = "click";
        return _this3;
    }

    return ClickAttribute;
}(EventAttribute);

exports.ClickAttribute = ClickAttribute;

var OnEnterAttribute = function (_KeyCodeAttribute) {
    _inherits(OnEnterAttribute, _KeyCodeAttribute);

    function OnEnterAttribute() {
        _classCallCheck(this, OnEnterAttribute);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this4 = _possibleConstructorReturn(this, _KeyCodeAttribute.call.apply(_KeyCodeAttribute, [this].concat(args)));

        _this4.keyCodes = [13];
        return _this4;
    }

    return OnEnterAttribute;
}(KeyCodeAttribute);

exports.OnEnterAttribute = OnEnterAttribute;

var OnEscapeAttribute = function (_KeyCodeAttribute2) {
    _inherits(OnEscapeAttribute, _KeyCodeAttribute2);

    function OnEscapeAttribute() {
        _classCallCheck(this, OnEscapeAttribute);

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        var _this5 = _possibleConstructorReturn(this, _KeyCodeAttribute2.call.apply(_KeyCodeAttribute2, [this].concat(args)));

        _this5.KeyCodes = [27];
        return _this5;
    }

    return OnEscapeAttribute;
}(KeyCodeAttribute);

exports.OnEscapeAttribute = OnEscapeAttribute;