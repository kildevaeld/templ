"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View(section, template, context, options) {
        _classCallCheck(this, View);

        this.section = section;
        this.template = template;
        this.context = context;
        this.bindings = [];
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
}();

exports.View = View;