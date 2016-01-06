'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        this._update();
        for (var key in this._attrBindings) {
            this._attrBindings[key].update();
        }
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
        _update: update || function () {}
    });
}
exports.binding = binding;