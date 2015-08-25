/// <reference path="vnode" />
/// <reference path="../transpiler" />

module templ.vnode {
	
	export class Text implements VNode {
		nodeType = NodeType.Text
		nodeValue: string
		constructor (nodeValue:string) {
			this.nodeValue = nodeValue;
		}
		render(options:VNodeOptions): Node {
			return options.document.createTextNode(this.nodeValue);
		}
	}
	
	export var text: compiler.TextCreator = function text (nodeValue:string): Text {
		return new Text(nodeValue)
	} 
	
}