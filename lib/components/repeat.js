"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var component_1 = require('./component');
var view_1 = require('../view');
function _each(target, iterate) {
    if (!target) return;
    if (target.forEach) {
        // use API here since target could be an object
        target.forEach(iterate);
    } else {
        for (var key in target) {
            if (target.hasOwnProperty(key)) iterate(target[key], key);
        }
    }
}

var Repeat = function (_component_1$BaseComp) {
    _inherits(Repeat, _component_1$BaseComp);

    function Repeat() {
        _classCallCheck(this, Repeat);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _component_1$BaseComp.call.apply(_component_1$BaseComp, [this].concat(args)));

        _this._children = [];
        return _this;
    }

    Repeat.prototype.initialize = function initialize() {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.childTemplate.render({}, {});

                        case 2:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    };

    Repeat.prototype.update = function update() {
        return __awaiter(this, void 0, void 0, regeneratorRuntime.mark(function _callee2() {
            var as, each, key, n, self, parent, properties, promises, i, ii, model, child;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            as = this['as'];
                            each = this['each'];
                            key = this['key'] || "key";
                            n = 0;
                            self = this;
                            parent = this.view;

                            if (each instanceof view_1.Call) {
                                each = each.call();
                            }

                            if (!(each == null)) {
                                _context2.next = 9;
                                break;
                            }

                            return _context2.abrupt('return');

                        case 9:
                            promises = [];
                            i = 0, ii = each.length;

                        case 11:
                            if (!(i < ii)) {
                                _context2.next = 31;
                                break;
                            }

                            model = each[i];

                            if (as) {
                                properties = {};
                                properties[key] = i;
                                properties[as] = model;
                            } else {
                                properties = model;
                            }
                            properties.parent = self.view.context;
                            // TODO - provide SAME context here for speed and stability

                            if (!(n >= self._children.length)) {
                                _context2.next = 24;
                                break;
                            }

                            _context2.next = 18;
                            return this.childTemplate.view(properties, {
                                parent: parent
                            });

                        case 18:
                            child = _context2.sent;

                            self._children.push(child);
                            self.section.appendChild(child.section.render());
                            promises.push(child.render(properties));
                            _context2.next = 27;
                            break;

                        case 24:
                            child = self._children[n];
                            child.context = properties;
                            child.update();

                        case 27:
                            n++;

                        case 28:
                            i++;
                            _context2.next = 11;
                            break;

                        case 31:
                            this._children.splice(n).forEach(function (child) {
                                child.remove();
                            });
                            _context2.next = 34;
                            return promises;

                        case 34:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));
    };

    Repeat.prototype.update2 = function update2() {
        var as = this['as'];
        var each = this['each'];
        var key = this['key'] || "key";
        var n = 0;
        var self = this;
        var parent = this.view;
        var properties;
        if (each instanceof view_1.Call) {
            each = each.call();
        }
        console.log(each);
        _each(each, function (model, k) {
            var child;
            if (as) {
                properties = {};
                properties[key] = k;
                properties[as] = model;
            } else {
                properties = model;
            }
            properties.parent = self.view.context;
            // TODO - provide SAME context here for speed and stability
            if (n >= self._children.length) {
                child = self.childTemplate.view(properties, {
                    parent: parent
                });
                self._children.push(child);
                self.section.appendChild(child.render(properties));
            } else {
                child = self._children[n];
                child.context = properties;
                child.update();
            }
            n++;
        });
        this._children.splice(n).forEach(function (child) {
            child.remove();
        });
    };

    Repeat.prototype.setAttribute = function setAttribute(key, value) {
        this[key] = value;
    };

    return Repeat;
}(component_1.BaseComponent);

exports.Repeat = Repeat;
exports.repeat = Repeat;