
/// <reference path="nodesection" />
/// <reference path="fragmentsection" />
/// <reference path="nodesection" />

/// <reference path="vnode" />


module vnode {
	export function section (document:Document, node:Node) {
		let section: Section
		if (node.nodeType == NodeType.Fragment) {
			let frag = new FragmentSection(document)
			frag.appendChild(node)
			section = frag
		} else {
			section = new NodeSection(document, node)
		}
		
		return section;
	}
}