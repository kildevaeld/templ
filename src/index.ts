'use strict';
declare var global:any
declare var require:any
import {extend} from 'orange';

import {IRepository, Repository} from './repository';
import * as vnode from './vnode/index';
import * as components from './components/index';
import * as attributes from './attributes/index';
import * as modifiers from './modifiers/index';

import * as utils from './utils';
import {View} from './view';
import * as compiler from './transpiler';
import {binding} from './binding';
import {RunLoop} from './runloop';

export var version = "$$version$$"

export interface TemplateOptions {
	document?: Document
	attributes?: IRepository<vnode.AttributeConstructor>
	components?: IRepository<vnode.ComponentConstructor>
	viewClass?: vnode.IViewConstructor,
	modifiers?: (value: any) => any
}



export function attribute(name: string, attr: vnode.AttributeConstructor | vnode.Attribute) {
		if (typeof attr !== 'function') {
		attr = utils.extendClass<vnode.AttributeConstructor>(attributes.BaseAttribute, attr)
		}
		attributes[name] = attr
}

export function component(name: string, cmp: vnode.ComponentConstructor | vnode.ComponentConstructor) {
		if (typeof cmp !== 'function') {
		cmp = utils.extendClass<vnode.ComponentConstructor>(components.BaseComponent, cmp)
		}
		components[name] = cmp
}

export function modifier(name: string, func: (value: any) => any) {
		modifiers[name] = func;
}



export function compile(str: string, options?: TemplateOptions): vnode.Template {
		let vn = vnode,
		fn = compiler.compile(str);

		let n = fn(vn.fragment, vn.element, vn.text, vn.comment, vn.dynamic, binding);

		return vn.template(n, extend({
			document: document,
			viewClass: View,
			attributes: new Repository(<any>attributes),
			components: new Repository(<any>components),
			modifiers: modifiers,
            runloop: new RunLoop()
		}, options || {}))
}