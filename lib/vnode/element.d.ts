import { VNode, NodeType, AttributeMap, VNodeOptions, Renderer, ComponentConstructor } from './vnode';
import { ElementCreator } from '../transpiler';
export declare class Element implements VNode {
    nodeType: NodeType;
    tagName: string;
    attributes: AttributeMap;
    childNodes: VNode[];
    constructor(tagName: string, attributes: AttributeMap, children: VNode[]);
    render(options: VNodeOptions, renderers: Renderer[]): HTMLElement;
    setAttributes(key: AttributeMap | string, value?: string): void;
    _renderComponent(component: ComponentConstructor, options: VNodeOptions, renderers: Renderer[]): HTMLElement;
    _renderElement(options: VNodeOptions, renderers: Renderer[]): HTMLElement;
    _splitAttributes(options: VNodeOptions): {
        dynamicAttributes: {};
        staticAttributes: {};
    };
}
export declare const element: ElementCreator;
