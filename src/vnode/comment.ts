
import * as compiler from '../transpiler'
import {NodeType, VNodeOptions, VNode} from './vnode'

export class Comment implements VNode {
		nodeType = NodeType.Comment
		nodeValue: string
		constructor (nodeValue:string) {
			this.nodeValue = nodeValue;
		}
		render(options:VNodeOptions): Node {
			return options.document.createComment(this.nodeValue);
		}
	}
	
	export const comment: compiler.CommentCreator = function (nodeValue:string): Comment {
		return new Comment(nodeValue)
	} 