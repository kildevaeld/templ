/// <reference path="../vnode/vnode" />
/// <reference path="../vnode/template" />
/// <reference path="../vnode/fragment" />

module components {
	
	export class BaseComponent implements vnode.Component {
		section: vnode.Section
		vnode: vnode.VNode
		attributes: vnode.AttributeMap
		view: vnode.IView
		document:Document
		childTemplate:vnode.Template
		constructor(section:vnode.Section, vvnode:vnode.VNode, attributes:vnode.AttributeMap, view:vnode.IView) {
			
			this.section = section
			this.vnode = vvnode
			this.attributes = attributes
			this.view = view
			this.document = view.template.options.document
			
			if (vvnode.childNodes) this.childTemplate = vnode.template(vnode.fragment(vvnode.childNodes), view.template.options);
  		for (var key in attributes) this.setAttribute(key, attributes[key]);
			
			this.initialize()
		}
		
		initialize () {
			
		}
		
		setAttribute (key:string, value:any) {
			this.attributes[key]  = value
		}
		
		removeAttribute(key:string) {
			this.attributes[key] = void 0
		}
	}
	
	
}