import { VNode, NodeType, VNodeOptions } from './vnode';
import { TextCreator } from '../transpiler';
export declare class Text implements VNode {
    nodeType: NodeType;
    nodeValue: string;
    constructor(nodeValue: string);
    render(options: VNodeOptions): Node;
}
export declare var text: TextCreator;
