import {Attribute, IView} from '../vnode/vnode'

export class BaseAttribute implements Attribute {
		ref: Node
		key: string
		value: any
		view: IView

		constructor(ref: Node, key: string, value: any, view: IView) {
		this.ref = ref
		this.key = key
		this.value = value
		this.view = view

		this.initialize()
		}

		initialize() { }

		update() { }

		destroy() { }

		static test() {

		}
}
