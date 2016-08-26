import { IRepository } from '../repository';
import { Template } from './template';
import { IDelegator } from '../view';
export declare const enum NodeType {
    Element = 1,
    Fragment = 11,
    Comment = 8,
    Dynamic = -200,
    Text = -201,
}
export interface VNodeCreator {
    (): VNode;
}
export interface VNodeOptions {
    document: HTMLDocument;
    attributes: IRepository<AttributeConstructor>;
    components: IRepository<ComponentConstructor>;
}
export interface VNode {
    nodeType: NodeType;
    parentNode?: VNode;
    render(option: VNodeOptions, renderes: Renderer[]): Promise<Node>;
    childNodes?: VNode[];
}
export interface Section {
    node?: Node;
    start?: Node;
    end?: Node;
    clone(): Section;
    render(): Node;
    remove(): any;
    appendChild(child: Node): any;
    createMarker(): Marker;
}
export interface Marker {
    createSection(root: Node): Section;
}
export interface IView extends IDelegator {
    bindings: Bindable[];
    section: Section;
    template: Template;
    context: any;
}
export interface IViewConstructor {
    new (section: Section, template: Template, context: any, options?: any): IView;
}
export interface Destroyable {
    destroy(): any;
}
export interface Renderer {
    generate(node: Node, view: IView): Promise<void>;
}
export interface Attribute extends Bindable {
    ref: Node;
    key: string;
    value: any;
    view: IView;
}
export interface AttributeConstructor {
    new (ref: Node, key: string, value: any, view: IView): Attribute;
}
export interface Component extends Bindable {
    setAttribute(key: string, value: any): any;
    removeAttribute(key: string): any;
    initialize(): Promise<void>;
}
export interface ComponentConstructor {
    new (section: Section, vnode: VNode, attributes: AttributeMap, view: IView): Component;
}
export interface Bindable extends Destroyable {
    update?: (context?: any) => Promise<void>;
}
export interface Binding extends Bindable {
    setAttribute(key: string, value: string): any;
}
export interface BindingContructor {
    new (ref: Node, view: IView): Binding;
}
export declare type AttributeMap = {
    [key: string]: string;
};
export declare type DynamicAttributeMap = {
    [key: string]: AttributeConstructor;
};
export declare function getNodeByPath(root: Node, path: string[]): Node;
export declare function getNodePath(node: Node): string[];
