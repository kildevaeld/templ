import {BaseAttribute} from './base';
import {Reference} from '../view';
import * as utils from '../utils';

const _events = ['change', 'keyup', 'input']
	export class ValueAttribute extends BaseAttribute {

		model: Reference
		_autocompleteCheckInterval: number
		initialize() {
			(<any>this)._onInput = utils.bind(this._onInput, this, null)

			for (let e of _events) {

				this.ref.addEventListener(e, this._onInput)
			}
		}

		update() {
			var model = this.model = this.value;

			if (!model) return;

			if (!model || !(model instanceof Reference)) {
				throw new Error("input value must be a reference. Make sure you have <~> defined");
			}

			if (model.gettable) {
				this._elementValue(this._parseValue(model.value()));
			}
		}

		_parseValue(value) {
			if (value == null || value === "") return void 0;
			return value;
		}

		_onInput(event:KeyboardEvent) {
			clearInterval(this._autocompleteCheckInterval);

    	// ignore some keys
    	if (event && (!event.keyCode || !~[27].indexOf(event.keyCode))) {
      	event.stopPropagation();
    	}

    	var value = this._parseValue(this._elementValue());

    	if (!this.model) return;

    	if (String(this.model.value()) == String(value))  return;

    	this.model.value(value);
		}

		_elementValue(value?): any {
			var node = <HTMLInputElement>this.ref
			var isCheckbox = /checkbox/.test(node.type);
			var isRadio = /radio/.test(node.type);
			var isRadioOrCheckbox = isCheckbox || isRadio;
			var hasValue = Object.prototype.hasOwnProperty.call(node, "value");
			var isInput = hasValue || /input|textarea|checkbox/.test(node.nodeName.toLowerCase());

			if (!arguments.length) {
				if (isCheckbox) {
					return Boolean(node.checked);
				} else if (isInput) {
					return node.value || "";
				} else {
					return node.innerHTML || "";
				}
			}

			if (value == null) {
				value = "";
			} else {
				clearInterval(this._autocompleteCheckInterval);
			}

			if (isRadioOrCheckbox) {
				if (isRadio) {
					if (String(value) === String(node.value)) {
						node.checked = true;
					}
				} else {
					node.checked = value;
				}
			} else if (String(value) !== this._elementValue()) {

				if (isInput) {
					node.value = value;
				} else {
					node.innerHTML = value;
				}
			}
		}


	}