"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseAttribute = function () {
    function BaseAttribute(ref, key, value, view) {
        _classCallCheck(this, BaseAttribute);

        this.ref = ref;
        this.key = key;
        this.value = value;
        this.view = view;
        this.initialize();
    }

    BaseAttribute.prototype.initialize = function initialize() {};

    BaseAttribute.prototype.update = function update() {};

    BaseAttribute.prototype.destroy = function destroy() {};

    BaseAttribute.test = function test() {};

    return BaseAttribute;
}();

exports.BaseAttribute = BaseAttribute;