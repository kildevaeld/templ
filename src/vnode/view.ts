/// <reference path="vnode" />
/// <reference path="template" />

module vnode {
	
	export class View implements IView {
		bindings: Binding[] = []
		constructor(public section:Section, public template:Template,public context:any,options?:any) {
			console.log('contro')
		}
		
		update () {
			console.log('ypdate')
			for (let binding of this.bindings) {
				
				binding.update()
			}
		}
		render () {
			console.log('render')
			return this.section.render()
		}
		remove () {
			return this.section.remove()
		}
		
	}
	
}