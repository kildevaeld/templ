'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var utils = require('./utils');

var Binding = function () {
    function Binding(ref, view) {
        _classCallCheck(this, Binding);

        this._attrBindings = {};
        this.ref = ref;
        this.view = view;
        this.options = view.template.options;
        this._attributeClasses = this.options.attributes;
    }

    Binding.prototype.setAttribute = function setAttribute(key, value) {
        if (!this.setAsRegisteredAttribute(key, value)) {
            if (value != void 0) {
                this.ref.setAttribute(key, value);
            } else {}
        }
    };

    Binding.prototype.setProperty = function setProperty(key, value) {
        if (!this.setAsRegisteredAttribute(key, value)) {
            // no node type? It's a registered component.
            if (!this.ref.nodeType) {
                this.ref.setAttribute(key, value);
            } else {
                this.ref[key] = value;
            }
        }
    };

    Binding.prototype.setAsRegisteredAttribute = function setAsRegisteredAttribute(key, value) {
        if (this._attrBindings[key]) {
            this._attrBindings[key].value = value;
        } else {
            var attrClass = this._attributeClasses.get(key);
            if (attrClass) {
                this._attrBindings[key] = new attrClass(this.ref, key, value, this.view);
            } else {
                return false;
            }
        }
        return true;
    };

    Binding.prototype.update = function update(context) {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            var key;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this._update();

                        case 2:
                            _context.t0 = regeneratorRuntime.keys(this._attrBindings);

                        case 3:
                            if ((_context.t1 = _context.t0()).done) {
                                _context.next = 9;
                                break;
                            }

                            key = _context.t1.value;
                            _context.next = 7;
                            return this._attrBindings[key].update();

                        case 7:
                            _context.next = 3;
                            break;

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };

    Binding.prototype.destroy = function destroy() {
        for (var key in this._attrBindings) {
            this._attrBindings[key].destroy();
        }
    };

    return Binding;
}();

exports.Binding = Binding;
function binding(initialize, update) {
    return utils.extendClass(Binding, {
        initialize: initialize || function () {},
        _update: update || function () {
            return Promise.resolve();
        }
    });
}
exports.binding = binding;