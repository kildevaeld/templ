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
        var _this = this;

        return this.vnode.render(options, renderers).then(function (node) {
            renderers.push(new DynamicRenderer(node, _this.bindingClass, options));
            return node;
        });
    };

    Dynamic.prototype._renderComponent = function _renderComponent(options, renderers) {
        var _this2 = this;

        var _r = [];
        return this.vnode.render(options, _r).then(function (element) {
            renderers.push(new DynamicComponentRenderer(_r[0], _this2.bindingClass, options));
            return element;
        });
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
        var _this3 = this;

        return this.renderer.generate(root, view).then(function () {
            var component = view.bindings[view.bindings.length - 1];
            view.bindings.splice(view.bindings.indexOf(component), 0, new _this3.bindingClass(component, view));
        });
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
        return Promise.resolve();
    };

    return DynamicRenderer;
}();