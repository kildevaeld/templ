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
			var node = this.vnode.render(options, renderers)
			
			renderers.push(new DynamicRenderer(node,this.bindingClass, options));
			
			return node;
		}
		
	}
	
	export const dynamic: parser.DynamicCreator = function (vnode:VNode, bindClass:BindingContructor): Dynamic {
		return new Dynamic(vnode,bindClass);
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
