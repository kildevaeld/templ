import {BaseAttribute} from './base';

export class StyleAttribute extends BaseAttribute {
	_currentStyles: { [key: string]: string }
	initialize() {
		this._currentStyles = {}
	}
	update(): Promise<void> {
		var styles = this.value;

		if (typeof styles === "string") {
			(<HTMLElement>this.ref).setAttribute("style", styles);
			return Promise.resolve();
		}

		var newStyles = {};

		for (var name in styles) {
			var style = styles[name];
			if (style !== this._currentStyles[name]) {
				newStyles[name] = this._currentStyles[name] = style || "";
			}
		}
		for (var key in newStyles) {
			(<HTMLElement>this.ref).style[key] = newStyles[key];
		}

		return Promise.resolve();
	}
}