import * as compiler from '../transpiler';
import { NodeType, VNodeOptions, VNode } from './vnode';
export declare class Comment implements VNode {
    nodeType: NodeType;
    nodeValue: string;
    constructor(nodeValue: string);
    render(options: VNodeOptions): Node;
}
export declare const comment: compiler.CommentCreator;
