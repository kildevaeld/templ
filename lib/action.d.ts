import { IContextView } from './vnode/vnode';
export declare class Reference {
    __classType: string;
    gettable: boolean;
    settable: boolean;
    view: IContextView;
    path: string;
    value(value?: any): any;
    constructor(view: IContextView, path: string, gettable: boolean, settable: boolean);
    toString(): string;
}
export declare class Assignment {
    __classType: string;
    view: IContextView;
    path: string;
    value: () => any;
    constructor(view: IContextView, path: string, value: () => any);
    assign(): void;
    toString(): string;
}
export declare class Call {
    __classType: string;
    view: IContextView;
    keypath: string;
    params: any[];
    constructor(view: IContextView, keypath: string, params: any[]);
    call(...args: any[]): any;
    toString(): string;
}
export declare function isCall(a: any): a is Call;
export declare function isReference(a: any): a is Reference;
export declare function isAssignment(a: any): a is Assignment;
