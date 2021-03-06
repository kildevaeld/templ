import { VNode, BindingContructor, NodeType, VNodeOptions, Renderer } from './vnode';
import { DynamicCreator } from '../transpiler';
export declare class Dynamic implements VNode {
    nodeType: NodeType;
    vnode: VNode;
    bindingClass: BindingContructor;
    constructor(vnode: VNode, bindingClass: BindingContructor);
    render(options: VNodeOptions, renderers: Renderer[]): Promise<Node>;
    _renderElement(options: VNodeOptions, renderers: Renderer[]): Promise<Node>;
    _renderComponent(options: VNodeOptions, renderers: Renderer[]): Promise<Node>;
}
export declare const dynamic: DynamicCreator;
