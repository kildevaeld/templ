import { Component, Section, VNode, AttributeMap, IView } from '../vnode/vnode';
import { Template } from '../vnode/template';
export declare class BaseComponent implements Component {
    section: Section;
    vnode: VNode;
    attributes: AttributeMap;
    view: IView;
    document: Document;
    childTemplate: Template;
    constructor(section: Section, vvnode: VNode, attributes: AttributeMap, view: IView);
    initialize(): void;
    setAttribute(key: string, value: any): void;
    removeAttribute(key: string): void;
    destroy(): void;
}
