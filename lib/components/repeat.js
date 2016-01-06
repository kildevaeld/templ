"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component_1 = require('./component');
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

    Repeat.prototype.update = function update() {
        var as = this['as'];
        var each = this['each'];
        var key = this['key'] || "key";
        var n = 0;
        var self = this;
        var parent = this.view;
        var properties;
        _each(each, function (model, k) {
            var child;
            if (as) {
                properties = {};
                properties[key] = k;
                properties[as] = model;
            } else {
                properties = model;
            }
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