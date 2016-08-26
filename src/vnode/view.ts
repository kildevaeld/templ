
import {Bindable, Section, IView} from './vnode';
import {Template} from './template';
import {RunLoop} from '../runloop';
import {EventEmitter} from 'eventsjs';

export class View extends EventEmitter implements IView {
	bindings: Bindable[] = []
	_runloop: RunLoop;
	context: any;
	constructor(public section: Section, public template: Template, context: any, options?: any) {
		super();
		this._runloop = options.runloop;
		this.context = context;
	}

	update(): Promise<void> {
		return Promise.all(this.bindings.map(m => m.update()))
		.then( v => void 0);
	}

	addListener(elm: Node, eventName: string, callback: EventListener, capture: boolean = false): Function {
		elm.addEventListener(eventName, callback, capture)
		return callback
	}

	removeListener(elm: Node, eventName: string, callback: EventListener, capture: boolean = false) {
		elm.removeEventListener(eventName, callback, capture)
	}

	render(): Promise<Node> {
		return Promise.resolve(this.section.render());
	}

	remove() {
		for (let binding of this.bindings) {
			binding.destroy();
		}
		return this.section.remove()
	}

}