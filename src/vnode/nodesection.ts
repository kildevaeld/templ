/// <reference path="vnode" />

module vnode {

	export class NodeSection implements Section {
		document: Document
		node: Node
		constructor(document: Document, node: Node) {
			this.document = document
			this.node = node
		}

		createMarker(): NodeSectionMarker {
			return new NodeSectionMarker(this.document, vnode.getNodePath(this.node));
		}

		appendChild(node: Node) {
			this.node.appendChild(node)
		}

		render(): Node {
			return this.node
		}

		remove() {
			if (this.node.parentNode) this.node.parentNode.removeChild(this.node);
		}

		removeChildren() {
			while (this.node.childNodes.length) this.node.removeChild(this.node.childNodes[0]);
		}

		clone(): NodeSection {
			return new NodeSection(this.document, this.node.cloneNode(true));
		}
	}

	export class NodeSectionMarker implements vnode.Marker {
		document: Document
		path: string[]

		constructor(document: Document, path: string[]) {
			this.document = document
			this.path = path

		}

		createSection(root: Node): NodeSection {
			return new NodeSection(this.document, this.findNode(root));
		}
		findNode(root) {
			return getNodeByPath(root, this.path);
		}
	}

}
