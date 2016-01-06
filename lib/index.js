'use strict';

var repository_1 = require('./repository');
var vnode = require('./vnode');
var components = require('./components');
var attributes = require('./attributes');
var modifiers = require('./modifiers');
var utils = require('./utils');
var view_1 = require('./view');
var compiler = require('./transpiler');
var binding_1 = require('./binding');
exports.version = "$$version$$";
function attribute(name, attr) {
    if (typeof attr !== 'function') {
        attr = utils.extendClass(attributes.BaseAttribute, attr);
    }
    attributes[name] = attr;
}
exports.attribute = attribute;
function component(name, cmp) {
    if (typeof cmp !== 'function') {
        cmp = utils.extendClass(components.BaseComponent, cmp);
    }
    components[name] = cmp;
}
exports.component = component;
function modifier(name, func) {
    modifiers[name] = func;
}
exports.modifier = modifier;
function debugging(enabled) {
    utils.Debug.enable(enabled);
}
exports.debugging = debugging;
function compile(str, options) {
    var vn = vnode,
        fn = compiler.compile(str);
    var n = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, binding_1.binding);
    return vn.template(n, utils.extend({
        document: document,
        viewClass: view_1.View,
        attributes: new repository_1.Repository(attributes),
        components: new repository_1.Repository(components),
        modifiers: modifiers
    }, options || {}));
}
exports.compile = compile;