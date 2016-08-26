"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var base_1 = require('./base');
var view_1 = require('../view');
var utils = require('../utils');
var _events = ['change', 'keyup', 'input'];

var ValueAttribute = function (_base_1$BaseAttribute) {
    _inherits(ValueAttribute, _base_1$BaseAttribute);

    function ValueAttribute() {
        _classCallCheck(this, ValueAttribute);

        return _possibleConstructorReturn(this, _base_1$BaseAttribute.apply(this, arguments));
    }

    ValueAttribute.prototype.initialize = function initialize() {
        this._onInput = utils.bind(this._onInput, this, null);
        for (var _iterator = _events, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var e = _ref;

            this.ref.addEventListener(e, this._onInput);
        }
    };

    ValueAttribute.prototype.update = function update() {
        var model = this.model = this.value;
        if (!model) return Promise.resolve();
        if (!model || !(model instanceof view_1.Reference)) {
            throw new Error("input value must be a reference. Make sure you have <~> defined");
        }
        if (model.gettable) {
            this._elementValue(this._parseValue(model.value()));
        }
        return Promise.resolve();
    };

    ValueAttribute.prototype._parseValue = function _parseValue(value) {
        if (value == null || value === "") return void 0;
        return value;
    };

    ValueAttribute.prototype._onInput = function _onInput(event) {
        clearInterval(this._autocompleteCheckInterval);
        // ignore some keys
        if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
            event.stopPropagation();
        }
        var value = this._parseValue(this._elementValue());
        if (!this.model) return;
        if (String(this.model.value()) == String(value)) return;
        this.model.value(value);
    };

    ValueAttribute.prototype._elementValue = function _elementValue(value) {
        var node = this.ref;
        var isCheckbox = /checkbox/.test(node.type);
        var isRadio = /radio/.test(node.type);
        var isRadioOrCheckbox = isCheckbox || isRadio;
        var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
        var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());
        var isSelect = /select/i.test(node.nodeName);
        if (!arguments.length) {
            if (isCheckbox) {
                return Boolean(node.checked);
            } else if (isInput || isSelect) {
                return node.value || "";
            } else {
                return node.innerHTML || "";
            }
        }
        if (value == null) {
            value = "";
        } else {
            clearInterval(this._autocompleteCheckInterval);
        }
        if (isRadioOrCheckbox) {
            if (isRadio) {
                if (String(value) === String(node.value)) {
                    node.checked = true;
                }
            } else {
                node.checked = value;
            }
        } else if (String(value) !== this._elementValue()) {
            if (isInput || isSelect) {
                node.value = value;
            } else {
                node.innerHTML = value;
            }
        }
    };

    return ValueAttribute;
}(base_1.BaseAttribute);

exports.ValueAttribute = ValueAttribute;