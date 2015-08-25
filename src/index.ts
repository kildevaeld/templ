
/// <reference path="compiler" />
/// <reference path="binding" />
/// <reference path="vnode/template" />
/// <reference path="vnode/text" />
/// <reference path="vnode/dynamic" />
/// <reference path="vnode/element" />
/// <reference path="vnode/fragment" />
/// <reference path="vnode/comment" />


/// <reference path="modifiers/index" />

/// <reference path="utils" />

/// <reference path="view" />

/// <reference path="attributes/index" />
/// <reference path="attributes/base" />

/// <reference path="components/index" />


let virtualnode = {
	text: vnode.text,
	dynamic: vnode.dynamic,
	comment: vnode.comment,
	element: vnode.element,
	fragment: vnode.fragment,
	template: vnode.template
};


module templ {
	
	export var version = "$$version$$"
	
	export const compiler = {
		compile: parser.compile,
		vnode: vnode,
		transpile: parser.transpile
	}
	
	export const lib = {
		View: templ.View,
		Attribute: attributes.BaseAttribute,
		Component: components.BaseComponent,
		attributes: attributes,
		components: components
	}
	
	export interface TemplateOptions {
		document?: Document
		attributes?: {[key:string]: vnode.AttributeConstructor}
		components?: {[key: string]: vnode.ComponentConstructor}
		viewClass?:vnode.IViewConstructor,
		modifiers?:(value:any) => any
	}
	
	export function attribute (name:string, attr:vnode.AttributeConstructor|vnode.Attribute) {
		if (typeof attr !== 'function') {
			attr = utils.extendClass<vnode.AttributeConstructor>(attributes.BaseAttribute, attr)
		}
		attributes[name] = attr
	}
	
	export function component(name:string, cmp:vnode.ComponentConstructor|vnode.ComponentConstructor) {
		if (typeof cmp !== 'function') {
			cmp = utils.extendClass<vnode.ComponentConstructor>(components.BaseComponent, cmp)
		}
		components[name] = cmp
	}
	
	export function modifier(name:string, func:(value:any) => any) {
		modifiers[name] = func;
	}

	export function debugging(enabled:boolean) {
		utils.Debug.enable(enabled)
	}

	export function compile(str:string, options?:TemplateOptions): vnode.Template {
		let vn = virtualnode,
			fn = parser.compile(str);

		let vnode = fn(vn.fragment,vn.element,vn.text,vn.comment,vn.dynamic,engine.binding);

		return vn.template(vnode, utils.extend({
			document: document,
			viewClass: templ.View,
			attributes: <any>attributes,
			components:<any>components,
			modifiers: modifiers
		}, options||{}))
	}

}