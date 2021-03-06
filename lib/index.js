'use strict';

var orange_1 = require('orange');
var repository_1 = require('./repository');
var vnode = require('./vnode/index');
var components = require('./components/index');
var attributes = require('./attributes/index');
var modifiers = require('./modifiers/index');
var utils = require('./utils');
var view_1 = require('./view');
var compiler = require('./transpiler');
var binding_1 = require('./binding');
var runloop_1 = require('./runloop');
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
function compile(str, options) {
    var vn = vnode,
        fn = compiler.compile(str);
    var n = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, binding_1.binding);
    return vn.template(n, orange_1.extend({
        document: document,
        viewClass: view_1.View,
        attributes: new repository_1.Repository(attributes),
        components: new repository_1.Repository(components),
        modifiers: modifiers,
        runloop: new runloop_1.RunLoop()
    }, options || {}));
}
exports.compile = compile;