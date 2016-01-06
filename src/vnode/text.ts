
import {VNode, NodeType, VNodeOptions} from './vnode';
import {TextCreator} from '../transpiler';

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
	
	export var text: TextCreator = function text (nodeValue:string): Text {
		return new Text(nodeValue)
	} 