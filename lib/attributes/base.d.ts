import { Attribute, IView } from '../vnode/vnode';
export declare class BaseAttribute implements Attribute {
    ref: Node;
    key: string;
    value: any;
    view: IView;
    constructor(ref: Node, key: string, value: any, view: IView);
    initialize(): void;
    update(): void;
    destroy(): void;
    static test(): void;
}
