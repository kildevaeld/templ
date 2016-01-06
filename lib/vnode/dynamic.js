"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vnode_1 = require('./vnode');

var Dynamic = function () {
    function Dynamic(vnode, bindingClass) {
        _classCallCheck(this, Dynamic);

        this.nodeType = -200 /* Dynamic */;
        this.vnode = vnode;
        this.bindingClass = bindingClass;
        this.vnode.parentNode = this;
    }

    Dynamic.prototype.render = function render(options, renderers) {
        if (options.components.has(this.vnode['tagName'])) {
            return this._renderComponent(options, renderers);
        } else {
            return this._renderElement(options, renderers);
        }
    };

    Dynamic.prototype._renderElement = function _renderElement(options, renderers) {
        var node = this.vnode.render(options, renderers);
        renderers.push(new DynamicRenderer(node, this.bindingClass, options));
        return node;
    };

    Dynamic.prototype._renderComponent = function _renderComponent(options, renderers) {
        var _r = [];
        var element = this.vnode.render(options, _r);
        renderers.push(new DynamicComponentRenderer(_r[0], this.bindingClass, options));
        return element;
    };

    return Dynamic;
}();

exports.Dynamic = Dynamic;
exports.dynamic = function (vnode, bindClass) {
    return new Dynamic(vnode, bindClass);
};

var DynamicComponentRenderer = function () {
    function DynamicComponentRenderer(renderer, bindingClass, options) {
        _classCallCheck(this, DynamicComponentRenderer);

        this.renderer = renderer;
        this.bindingClass = bindingClass;
        this.options = options;
    }

    DynamicComponentRenderer.prototype.generate = function generate(root, view) {
        this.renderer.generate(root, view);
        var component = view.bindings[view.bindings.length - 1];
        view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(component, view));
    };

    return DynamicComponentRenderer;
}();

var DynamicRenderer = function () {
    function DynamicRenderer(node, bindingClass, options) {
        _classCallCheck(this, DynamicRenderer);

        this.ref = node;
        this.bindingClass = bindingClass;
        this.options = options;
    }

    DynamicRenderer.prototype.generate = function generate(root, view) {
        if (!this._refPath) this._refPath = vnode_1.getNodePath(this.ref);
        view.bindings.push(new this.bindingClass(vnode_1.getNodeByPath(root, this._refPath), view));
    };

    return DynamicRenderer;
}();