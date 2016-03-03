"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventsjs_1 = require('eventsjs');

var View = function (_eventsjs_1$EventEmit) {
    _inherits(View, _eventsjs_1$EventEmit);

    function View(section, template, context, options) {
        _classCallCheck(this, View);

        var _this = _possibleConstructorReturn(this, _eventsjs_1$EventEmit.call(this));

        _this.section = section;
        _this.template = template;
        _this.bindings = [];
        _this._runloop = options.runloop;
        _this.context = context;
        return _this;
    }

    View.prototype.update = function update() {
        for (var _iterator = this.bindings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var binding = _ref;

            binding.update();
        }
    };

    View.prototype.addListener = function addListener(elm, eventName, callback) {
        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        elm.addEventListener(eventName, callback, capture);
        return callback;
    };

    View.prototype.removeListener = function removeListener(elm, eventName, callback) {
        var capture = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

        elm.removeEventListener(eventName, callback, capture);
    };

    View.prototype.render = function render() {
        return this.section.render();
    };

    View.prototype.remove = function remove() {
        for (var _iterator2 = this.bindings, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var binding = _ref2;

            binding.destroy();
        }
        return this.section.remove();
    };

    return View;
}(eventsjs_1.EventEmitter);

exports.View = View;