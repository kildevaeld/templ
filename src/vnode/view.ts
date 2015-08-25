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
		
		addListener(elm:Node,eventName:string, callback:EventListener, capture:boolean = false) {
			elm.addEventListener(eventName, callback, capture)
		}
		
		removeListener(elm:Node, eventName:string, callback:EventListener, capture:boolean = false) {
			elm.removeEventListener(eventName, callback, capture)
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