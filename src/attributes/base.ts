/// <reference path="../vnode/vnode" />


module attributes {
	
	export class BaseAttribute {
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
		
		initialize () {
			
		}
		
		update () {
			
		}
	}
	
	
}