import { VNode, NodeType, VNodeOptions, Renderer } from './vnode';
import { FragmentCreator } from '../transpiler';
export declare class Fragment implements VNode {
    nodeType: NodeType;
    childNodes: VNode[];
    constructor(children: VNode[]);
    render(options: VNodeOptions, renderers: Renderer[]): DocumentFragment;
}
export declare const fragment: FragmentCreator;
