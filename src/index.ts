
/// <reference path="compiler" />
/// <reference path="binding" />
/// <reference path="vnode/template" />
/// <reference path="vnode/text" />
/// <reference path="vnode/dynamic" />
/// <reference path="vnode/element" />
/// <reference path="vnode/fragment" />
/// <reference path="vnode/comment" />

/// <reference path="view" />

/// <reference path="attributes/index" />
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
	export module compiler {
		export var compile = parser.compile
		export var vnode = virtualnode 
	}
	export interface Template {
		view(context:any, options:any): vnode.IView
	}
	
	export function debugging(enabled:boolean) {
		utils.Debug.enable(enabled)
	}
	
	export function compile(str:string): Template {
		let vn = virtualnode,
			fn = parser.compile(str);
		
		let vnode = fn(vn.fragment,vn.element,vn.text,vn.comment,vn.dynamic,engine.binding);   
		
		return vn.template(vnode, {
			document: document,
			viewClass: templ.View,
			attributes: <any>attributes,
			components:<any>components
		})
	}
	
}