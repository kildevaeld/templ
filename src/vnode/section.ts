
import {Section, NodeType} from './vnode';
import {FragmentSection} from './fragmentsection';
import {NodeSection} from './nodesection';

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