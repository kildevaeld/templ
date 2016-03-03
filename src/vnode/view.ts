
import {Bindable, Section, IView} from './vnode'
import {Template} from './template';
import {RunLoop} from '../runloop'
export class View implements IView {
		bindings: Bindable[] = []
		_runloop: RunLoop;
		context: any;
		constructor(public section:Section, public template:Template, context:any,options?:any) {
			this._runloop = options.runloop;
			this.context = context;
		}

		update () {
			for (let binding of this.bindings) {
				binding.update()
			}

		}

		addListener(elm:Node,eventName:string, callback:EventListener, capture:boolean = false): Function {
			elm.addEventListener(eventName, callback, capture)
			return callback
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