/// <reference path="vnode" />
/// <reference path="template" />

module vnode {
	
	export class View implements IView {
		bindings: Bindable[] = []
		constructor(public section:Section, public template:Template,public context:any,options?:any) {
			
		}
		
		update () {
			for (let binding of this.bindings) {
				binding.update()
			}
			
		}
		
		render () {
			return this.section.render()
		}
		
		remove () {
			for (let binding of this.bindings) {
				binding.destroy();
			}
			return this.section.remove()
		}
		
	}
	
}