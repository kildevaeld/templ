
/// <reference path="vnode/vnode" />
/// <reference path="transpiler" />
/// <reference path="utils" />


module engine {
	
	export class Binding implements vnode.Binding {
		ref:Node
		view:vnode.IView
		_update: Function
		constructor(ref:Node, view:vnode.IView) {
			this.ref = ref
			this.view = view
		}
		
		setAttribute (key:string, value:string) {
			
		}
		
		update (context:any) {
			console.log(this.ref)
			this._update()
		}
	}
	
	
	export function binding (initialize:()=>void,update:(context)=>void): vnode.BindingContructor {
		return utils.extendClass<vnode.BindingContructor>(Binding,{
			initialize: initialize||function () {},
			_update: update||function () {}
		});
	}
		
}
