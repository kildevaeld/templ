

module templ {
	
	export var version = "$$version$$"
	
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
		let vn = templ.vnode,
			fn = compiler.compile(str);

		let vnode = fn(vn.fragment,vn.element,vn.text,vn.comment,vn.dynamic,templ.binding);

		return vn.template(vnode, utils.extend({
			document: document,
			viewClass: templ.View,
			attributes: <any>attributes,
			components:<any>components,
			modifiers: modifiers
		}, options||{}))
	}

}