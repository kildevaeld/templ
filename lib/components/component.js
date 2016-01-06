"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var template_1 = require('../vnode/template');
var fragment_1 = require('../vnode/fragment');

var BaseComponent = function () {
    function BaseComponent(section, vvnode, attributes, view) {
        _classCallCheck(this, BaseComponent);

        this.section = section;
        this.vnode = vvnode;
        this.attributes = attributes;
        this.view = view;
        this.document = view.template.options.document;
        if (vvnode.childNodes) this.childTemplate = template_1.template(fragment_1.fragment(vvnode.childNodes), view.template.options);
        for (var key in attributes) {
            this.setAttribute(key, attributes[key]);
        }this.initialize();
    }

    BaseComponent.prototype.initialize = function initialize() {};

    BaseComponent.prototype.setAttribute = function setAttribute(key, value) {
        this.attributes[key] = value;
    };

    BaseComponent.prototype.removeAttribute = function removeAttribute(key) {
        this.attributes[key] = void 0;
    };

    BaseComponent.prototype.destroy = function destroy() {};

    return BaseComponent;
}();

exports.BaseComponent = BaseComponent;