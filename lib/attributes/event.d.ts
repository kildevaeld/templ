import { BaseAttribute } from './base';
import { IView } from '../vnode/vnode';
export declare class EventAttribute extends BaseAttribute {
    private _event;
    event: string;
    initialize(): void;
    _onEvent(e: any): any;
    destroy(): void;
}
export declare class KeyCodeAttribute extends EventAttribute {
    keyCodes: number[];
    event: string;
    constructor(ref: Node, key: string, value: any, view: IView);
    _onEvent(event: any): void;
}
export declare class ChangeAttribute extends EventAttribute {
    event: string;
}
export declare class ClickAttribute extends EventAttribute {
    event: string;
}
export declare class ScrollAttribute extends EventAttribute {
    event: string;
}
export declare class OnFocusAttribute extends EventAttribute {
    event: string;
}
export declare class BlurAttribute extends EventAttribute {
    event: string;
}
export declare class OnEnterAttribute extends KeyCodeAttribute {
    keyCodes: number[];
}
export declare class OnEscapeAttribute extends KeyCodeAttribute {
    KeyCodes: number[];
}
