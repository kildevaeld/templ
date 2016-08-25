
import {Component, Section, VNode, AttributeMap, IView} from '../vnode/vnode';
import {Template, template} from '../vnode/template';
import {fragment} from '../vnode/fragment';

export abstract class BaseComponent implements Component {
	section: Section
	vnode: VNode
	attributes: AttributeMap
	view: IView
	document: Document
	childTemplate: Template
	constructor(section: Section, vvnode: VNode, attributes: AttributeMap, view: IView) {

		this.section = section
		this.vnode = vvnode
		this.attributes = attributes
		this.view = view
		this.document = view.template.options.document

		if (vvnode.childNodes) this.childTemplate = template(fragment(vvnode.childNodes), view.template.options);
		for (var key in attributes) this.setAttribute(key, attributes[key]);

		//this.initialize()
	}

	initialize(): Promise<void> {
		return Promise.resolve();
	}

	setAttribute(key: string, value: any) {
		this.attributes[key] = value
	}

	removeAttribute(key: string) {
		this.attributes[key] = void 0
	}

	destroy() {

	}
}
