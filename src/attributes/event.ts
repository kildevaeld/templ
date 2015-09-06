/// <reference path="base" />
/// <reference path="../utils" />
/// <reference path="../view" />
/// <reference path="../utils" />

module templ.attributes {

	const debug = utils.debug('attributes:event')

	export class EventAttribute extends BaseAttribute {
		event:string
		initialize () {
			this._onEvent = utils.bind(this._onEvent, this);
			if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
			debug('added event listener %s: %o', this.event, this.value)
			this.view.addListener(<Element>this.ref, this.event, this._onEvent)

		}

		_onEvent (e:any) {
			var self = this;
			let fn;
			if (this.value instanceof templ.Assignment) {
				fn = this.value.assign;
			} else {
				fn = this.value;
			}

			if (typeof fn !== 'function') {
				throw new Error('[event] value is not a function')
			}
			debug('fired event: %s', this.event)
			fn(e);
		}

		destroy () {
			debug('removed event listener %s: %o', this.event, this.value);
			this.view.removeListener(<Element>this.ref, this.event, this._onEvent)
		}
	}

	export class KeyCodeAttribute extends EventAttribute {
		keyCodes:number[]
		constructor (ref:Node, key:string, value:any, view:vnode.IView) {
			this.event = "keydown"
			this.keyCodes = []
			super(ref,key,value,view)
		}
  	_onEvent (event) {
    	if (!~this.keyCodes.indexOf(event.keyCode)) {
      	return;
    	}
			super._onEvent(event)
  	}
	}

	export class ClickAttribute extends EventAttribute { }

	export class OnEnterAttribute extends KeyCodeAttribute {
		keyCodes = [13]
	}

	export class OnEscapeAttribute extends KeyCodeAttribute {
		KeyCodes = [27]
	}


}
