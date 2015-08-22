/// <reference path="vnode" />
/// <reference path="../transpiler" />

module vnode {
	
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
	
	export const comment: parser.CommentCreator = function (nodeValue:string): Comment {
		return new Comment(nodeValue)
	} 
	
}