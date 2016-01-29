import {Section, getNodeByPath, getNodePath, Marker} from './vnode'
import {NodeSection} from './nodesection'

export class FragmentSection implements Section {
		document: Document
		start: Node
		end: Node
		node: Node
		constructor(document: Document, start?: Node, end?: Node) {
			this.document = document

			this.start = start || document.createTextNode('')
			this.end = end || document.createTextNode('')

			if (!this.start.parentNode) {
				let parent = document.createDocumentFragment();
				parent.appendChild(this.start);
				parent.appendChild(this.end)
			}

		}

		appendChild(node: Node) {
			this.end.parentNode.insertBefore(node, this.end)
		}

		render(): Node {
			return this.start.parentNode;
		}

		remove() {
			var node = this.removeChildNodes();
			node.insertBefore(this.start, node.childNodes[0]);
			node.appendChild(this.end);
			return this;
		}

		removeChildNodes(): DocumentFragment {
			let node = this.document.createDocumentFragment(),
				start = this.start;

			let current = start.nextSibling;
			let end = this.end;

			while (current !== end) {
				node.appendChild(current);
				current = start.nextSibling;
			}

			return node;
		}

		createMarker(): FragmentSectionMarker {
			return new FragmentSectionMarker(this.document, getNodePath(this.start),getNodePath(this.end))
		}

		clone(): FragmentSection {
			var parentClone;

			// fragment?
			if (this.start.parentNode.nodeType === 11) {
				parentClone = this.start.parentNode.cloneNode(true);
			} else {
				parentClone = this.document.createDocumentFragment();
				var children = this._getChildNodes();
				var n = children.length;

				for (var i = 0; i < n; i++) {
					parentClone.appendChild(children[i].cloneNode(true));
				}
			}

			var first = parentClone.childNodes[0];
			var last = parentClone.childNodes[parentClone.childNodes.length - 1];

			return new FragmentSection(this.document, first, last);
		}


		_getChildNodes(): Node[] {
			var current = this.start;
			var end = this.end.nextSibling;
			var children = [];
			while (current !== end) {
				children.push(current);
				current = current.nextSibling;
			}
			return children;
		}

	}

	export class FragmentSectionMarker implements Marker {
	document: Document
	startPath: string[]
	endPath: string[]
	constructor(document:Document, startPath:string[],endPath:string[]) {
		this.document = document
		this.startPath = startPath
		this.endPath = endPath
	}

	createSection (root:Node): FragmentSection {
		return new FragmentSection(this.document, getNodeByPath(root,this.startPath),getNodeByPath(root,this.endPath))
	}
}

