/// <reference path="../vnode/vnode" />

module templ.attributes {

	export class BaseAttribute implements vnode.Attribute {
		ref: Node
		key: string
		value: any
		view: vnode.IView

		constructor(ref:Node, key:string, value:any, view:vnode.IView) {
			this.ref = ref
			this.key = key
			this.value = value
			this.view = view

			this.initialize()
		}

		initialize () { }

		update () { }

		destroy() { }
		
		static test() {
			
		}
	}


}