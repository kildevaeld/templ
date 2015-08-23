/// <reference path="vnode" />
/// <reference path="../transpiler" />

module vnode {
	
	export class Dynamic implements VNode {
		nodeType = NodeType.Dynamic
		vnode: VNode
		bindingClass: BindingContructor
		
		constructor (vnode:VNode, bindingClass:BindingContructor) {
			this.vnode = vnode;
			this.bindingClass = bindingClass
			this.vnode.parentNode = this
		}
		
		render (options:VNodeOptions, renderers:Renderer[]): Node {
			
			if (options.components[this.vnode['tagName']]) {	
				return this._renderComponent(options,renderers)
			} else {
				return this._renderElement(options, renderers)
			}
		}
		
		_renderElement (options:VNodeOptions, renderers:Renderer[]): Node {
			var node = this.vnode.render(options, renderers)
			renderers.push(new DynamicRenderer(node,this.bindingClass, options));

			return node;
		}
		
		_renderComponent (options:VNodeOptions, renderers:Renderer[]): Node {
			let _r = []
			var element = this.vnode.render(options, _r);
			
    	renderers.push(new DynamicComponentRenderer(_r[0], this.bindingClass, options));
    	
			return element;
		}
		
	}
	
	export const dynamic: parser.DynamicCreator = function (vnode:VNode, bindClass:BindingContructor): Dynamic {
		return new Dynamic(vnode,bindClass);
	}
	
}

class DynamicComponentRenderer implements vnode.Renderer {
	renderer: vnode.Renderer
	bindingClass: vnode.BindingContructor
	options:vnode.VNodeOptions 
	constructor(renderer:vnode.Renderer, bindingClass:vnode.BindingContructor, options:vnode.VNodeOptions) {
		this.renderer = renderer
		this.bindingClass = bindingClass
		this.options = options
	}	
	
	generate(root:Node, view:vnode.IView) {
		
		this.renderer.generate(root, view)
		let component = view.bindings[view.bindings.length - 1]
		
		view.bindings.splice(view.bindings.indexOf(component),0, new this.bindingClass(<any>component,view))
		
	}
}

class DynamicRenderer implements vnode.Renderer {
	options:any
	ref: Node
	bindingClass
	_refPath:string[]
	constructor (node:Node, bindingClass:vnode.BindingContructor,options?:any) {
		this.ref = node
		this.bindingClass = bindingClass
		this.options = options
	}
	
	generate(root:Node, view:vnode.IView) {
		if (!this._refPath) this._refPath = vnode.getNodePath(this.ref);
		
    view.bindings.push(new this.bindingClass(vnode.getNodeByPath(root, this._refPath), view));
	}
}
