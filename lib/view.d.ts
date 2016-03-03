import * as vnode from './vnode';
export declare class Reference {
    gettable: boolean;
    settable: boolean;
    view: View;
    path: string;
    value(value?: any): any;
    constructor(view: View, path: string, gettable: boolean, settable: boolean);
    toString(): string;
}
export declare class Assignment {
    view: View;
    path: string;
    value: () => any;
    constructor(view: View, path: string, value: () => any);
    assign(): void;
    toString(): string;
}
export declare class Call {
    view: View;
    keypath: string;
    params: any[];
    constructor(view: View, keypath: string, params: any[]);
    call(...args: any[]): any;
    toString(): string;
}
export interface IDelegator {
    addListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): Function;
    removeListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): any;
}
export declare class View extends vnode.View {
    context: any;
    protected _delegator: IDelegator;
    _callers: {
        [key: string]: Function;
    };
    _getters: any;
    parent: View;
    root: View;
    getDelegator(): IDelegator;
    addListener(elm: Element, eventName: string, callback: EventListener | string, capture?: boolean): Function;
    removeListener(elm: Element, eventName: string, callback: EventListener | string, capture?: boolean): void;
    get(keypath: any): any;
    constructor(section: vnode.Section, template: vnode.Template, context: any, options?: any);
    set(path: string | string[], value: any): any;
    render(): Node;
    protected updateLater(): void;
    ref(path: string, gettable: boolean, settable: boolean): Reference;
    assign(path: string, value: any): Assignment;
    call(keypath: string | string[], params: any): Call;
}
