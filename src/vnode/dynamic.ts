import {VNode, BindingContructor, NodeType, VNodeOptions, Renderer,
	getNodeByPath, getNodePath, IView} from './vnode';
import {DynamicCreator} from '../transpiler'

export class Dynamic implements VNode {
	nodeType = NodeType.Dynamic
	vnode: VNode
	bindingClass: BindingContructor

	constructor(vnode: VNode, bindingClass: BindingContructor) {
		this.vnode = vnode;
		this.bindingClass = bindingClass
		this.vnode.parentNode = this
	}

	render(options: VNodeOptions, renderers: Renderer[]): Promise<Node> {

		if (options.components.has(this.vnode['tagName'])) {
			return this._renderComponent(options, renderers)
		} else {
			return this._renderElement(options, renderers)
		}
	}

	_renderElement(options: VNodeOptions, renderers: Renderer[]): Promise<Node> {
		return this.vnode.render(options, renderers)
			.then(node => {
				renderers.push(new DynamicRenderer(node, this.bindingClass, options));
				return node;
			})

	}

	_renderComponent(options: VNodeOptions, renderers: Renderer[]): Promise<Node> {

		let _r = []
		return this.vnode.render(options, _r)
			.then(element => {
				renderers.push(new DynamicComponentRenderer(_r[0], this.bindingClass, options));
				return element;
			})


		
	}

}

export const dynamic: DynamicCreator = function (vnode: VNode, bindClass: BindingContructor): Dynamic {
	return new Dynamic(vnode, bindClass);
}

class DynamicComponentRenderer implements Renderer {
	renderer: Renderer
	bindingClass: BindingContructor
	options: VNodeOptions
	constructor(renderer: Renderer, bindingClass: BindingContructor, options: VNodeOptions) {
		this.renderer = renderer
		this.bindingClass = bindingClass
		this.options = options
	}

	generate(root: Node, view: IView): Promise<void> {

		return this.renderer.generate(root, view)
		.then( () => {
			let component = view.bindings[view.bindings.length - 1]
			view.bindings.splice(view.bindings.indexOf(component), 0, new this.bindingClass(<any>component, view));
		});
		
	}
}

class DynamicRenderer implements Renderer {
	options: any
	ref: Node
	bindingClass
	_refPath: string[]
	constructor(node: Node, bindingClass: BindingContructor, options?: any) {
		this.ref = node
		this.bindingClass = bindingClass
		this.options = options
	}

	generate(root: Node, view: IView): Promise<void> {
		if (!this._refPath) this._refPath = getNodePath(this.ref);

		view.bindings.push(new this.bindingClass(getNodeByPath(root, this._refPath), view));
		return Promise.resolve();
	}
}


