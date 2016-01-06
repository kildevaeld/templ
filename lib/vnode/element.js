"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('../utils');
var fragmentsection_1 = require('./fragmentsection');
var nodesection_1 = require('./nodesection');

var Element = function () {
    function Element(tagName, attributes, children) {
        _classCallCheck(this, Element);

        this.nodeType = 1 /* Element */;
        this.tagName = String(tagName).toLocaleLowerCase();
        this.childNodes = children;
        this.attributes = attributes || {};
        for (var i = 0; i < children.length; i++) {
            children[i].parentNode = this;
        }
    }

    Element.prototype.render = function render(options, renderers) {
        var components = options.components; // || {}
        if (components.has(this.tagName)) {
            return this._renderComponent(components.get(this.tagName), options, renderers);
        }
        return this._renderElement(options, renderers);
    };

    Element.prototype.setAttributes = function setAttributes(key, value) {
        if (typeof key === 'string') {
            this.attributes[key] = value;
        } else {
            utils.extend(this.attributes, key);
        }
    };

    Element.prototype._renderComponent = function _renderComponent(component, options, renderers) {
        var section = new fragmentsection_1.FragmentSection(options.document);
        renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options));
        return section.render();
    };

    Element.prototype._renderElement = function _renderElement(options, renderers) {
        var element = options.document.createElement(this.tagName);
        var _attr = this._splitAttributes(options);
        // Set static attributes
        for (var attrKey in _attr.staticAttributes) {
            element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
        }
        for (var _iterator = this.childNodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var child = _ref;

            element.appendChild(child.render(options, renderers));
        }
        // Set dynamic attributes
        if (Object.keys(_attr.dynamicAttributes).length) {
            renderers.push(new ElementAttributeRenderer(new nodesection_1.NodeSection(options.document, element), options, _attr.dynamicAttributes));
        }
        return element;
    };

    Element.prototype._splitAttributes = function _splitAttributes(options) {
        var dynamicAttributes = {};
        var staticAttributes = {};
        if (options.attributes) {
            for (var key in this.attributes) {
                var attrClass = options.attributes.get(key);
                if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
                    dynamicAttributes[key] = this.attributes[key];
                } else {
                    staticAttributes[key] = this.attributes[key];
                }
            }
        } else {
            staticAttributes = this.attributes;
        }
        return {
            dynamicAttributes: dynamicAttributes,
            staticAttributes: staticAttributes
        };
    };

    return Element;
}();

exports.Element = Element;
exports.element = function (tagName, attributes) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    return new Element(tagName, attributes, children);
};

var ComponentAttributeRenderer = function () {
    function ComponentAttributeRenderer(component, section, element, attr, options) {
        _classCallCheck(this, ComponentAttributeRenderer);

        this.section = section;
        this.componentClass = component;
        this.element = element;
        this.options = options;
        this.attributes = attr.staticAttributes;
        this.dynamicAttributes = attr.dynamicAttributes;
    }

    ComponentAttributeRenderer.prototype.generate = function generate(root, view) {
        if (!this._marker) this._marker = this.section.createMarker();
        var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
        if (Object.keys(this.dynamicAttributes).length) {
            _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
        }
        if (ref.update) view.bindings.push(ref);
    };

    return ComponentAttributeRenderer;
}();

var ElementAttributeRenderer = function () {
    function ElementAttributeRenderer(section, options, attributes) {
        _classCallCheck(this, ElementAttributeRenderer);

        this.section = section;
        this.options = options;
        this.attributes = attributes;
    }

    ElementAttributeRenderer.prototype.generate = function generate(root, view) {
        if (!this._marker) this._marker = this.section.createMarker();
        _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.attributes, view);
    };

    return ElementAttributeRenderer;
}();

function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
    for (var key in dynamicAttributes) {
        var clazz = options.attributes.get(key);
        var attr = new clazz(ref, key, dynamicAttributes[key], view);
        if (attr.update) view.bindings.push(attr);
    }
}