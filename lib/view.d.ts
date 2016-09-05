import * as vnode from './vnode/index';
import { Reference, Call, Assignment } from './action';
export interface IDelegator {
    addListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): Function;
    removeListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): any;
}
export declare class View extends vnode.View implements vnode.IContextView {
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
    render(): Promise<Node>;
    protected updateLater(): void;
    ref(path: string, gettable: boolean, settable: boolean): Reference;
    assign(path: string, value: any): Assignment;
    call(keypath: string | string[], params: any): Call;
}
