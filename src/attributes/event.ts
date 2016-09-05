import {BaseAttribute} from './base';
import {Assignment, Call, isCall, isAssignment} from '../action';
import {IView} from '../vnode/vnode';
import {bind} from 'orange';
import * as Debug from 'debug';
const debug = Debug('attributes:event');

export class EventAttribute extends BaseAttribute {
    private _event: string
    set event(event: string) {
        if (this._event) {
            debug('added event listener %s: %o', this._event, this.value)
            this.view.removeListener(<Element>this.ref, this._event, this._onEvent);
        }
        this._event = event;
        debug('added event listener %s: %o', this._event, this.value)

        this.view.addListener(<Element>this.ref, this._event, this._onEvent);
    }

    get event(): string {
        return this._event;
    }

    initialize() {
        this._onEvent = bind(this._onEvent, this);
        //if (!this.event) this.event = this.key.match(/on(.+)/)[1].toLowerCase();
        //debug('added event listener %s: %o', this.event, this.value)
        //this.view.addListener(<Element>this.ref, this.event, this._onEvent)

    }

    _onEvent(e: any) {
        var self = this;
        let fn;

        if (isAssignment(this.value)) {
            fn = this.value.assign;
        } else {
            fn = this.value;
        }

        if (typeof fn !== 'function' && !isCall(fn)) {
            throw new Error('[event] value is not a function or a Callable')
        }
        debug('fired event: %s', this._event)
        if (isCall(fn)) {
            fn.call();
        } else if (typeof fn === 'function') {
            return fn(e);
        }

        e.preventDefault();

    }

    destroy() {
        debug('removed event listener %s: %o', this._event, this.value);
        this.view.removeListener(<Element>this.ref, this._event, this._onEvent)
    }
}

export class KeyCodeAttribute extends EventAttribute {
    keyCodes: number[] = []
    event = "keydown"
    constructor(ref: Node, key: string, value: any, view: IView) {
        //this.event = "keydown"
        //this.keyCodes = []
        super(ref, key, value, view)
    }
    _onEvent(event) {
        if (!~this.keyCodes.indexOf(event.keyCode)) {
            return;
        }
        super._onEvent(event)
    }
}

export class ChangeAttribute extends EventAttribute {
    event = "change";
}

export class ClickAttribute extends EventAttribute {
    event = "click";
}

export class ScrollAttribute extends EventAttribute {
    event = "scroll";
}

export class OnFocusAttribute extends EventAttribute {
    event = "focus";
}

export class BlurAttribute extends EventAttribute {
    event = "blur";
}

export class OnEnterAttribute extends KeyCodeAttribute {
    keyCodes = [13];
}

export class OnEscapeAttribute extends KeyCodeAttribute {
    KeyCodes = [27];
}