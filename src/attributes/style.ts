/// <reference path="base" />

module attributes {
	
	export class StyleAttribute extends BaseAttribute {
		_currentStyles: {[key: string]: string}
		initialize() {
				this._currentStyles = {}
		}
		update() {
			var styles = this.value;

    	if (typeof styles === "string") {
      	(<HTMLElement>this.ref).setAttribute("style", styles);
      	return;
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
	}
	}
	
}