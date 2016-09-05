
import {IContextView} from './vnode/vnode';
import {bind} from 'orange';

export class Reference {
    get __classType() { return "Reference"; }
    gettable: boolean
    settable: boolean
    view: IContextView
    path: string

    value(value?: any): any {
        if (arguments.length === 0) {
            return this.gettable ? this.view.get(this.path) : void 0;
        }
        if (this.settable) this.view.set(this.path, value)
    }


    constructor(view: IContextView, path: string, gettable: boolean, settable: boolean) {
        this.gettable = gettable
        this.settable = settable
        this.view = view
        this.path = path
    }



    toString(): string {
        return this.view.get(this.path) || ''
    }
}

export class Assignment {
    get __classType() { return "Assignment"; }
    view: IContextView
    path: string
    value: () => any
    constructor(view: IContextView, path: string, value: () => any) {
        this.view = view
        this.path = path
        this.value = value
        this.assign = bind(this.assign, this);
        this.toString = bind(this.toString, this);
    }

    assign() {
        this.view.set(this.path, this.value.call(this));
    }

    toString(): string {
        let val = this.value.call(this)
        return val ? String(val) : '';
    }
}

export class Call {
    get __classType() { return "Call"; }
    view: IContextView
    keypath: string
    params: any[]
    constructor(view: IContextView, keypath: string, params: any[]) {
        this.view = view;
        this.keypath = keypath;
        this.params = params||[];
    }

    call(...args:any[]) {
        args = args||[];
        let fn = this.view.get(this.keypath)
        if (fn == null || typeof fn !== 'function') {
            //throw new Error("not exists or not function");
            return this.view.trigger('error', this, new Error("function does not exists or is not a function"));
        }

        return fn.apply(this.view, this.params.concat(args))
    }

    toString(): string {
        let val = this.call();
        return val ? String(val) : '';
    }
}


export function isCall(a:any): a is Call {
  return a && (a instanceof Call || a.__classType === 'Call');
}

export function isReference(a:any): a is Reference {
  return a && (a instanceof Reference || a.__classType === 'Reference');
}

export function isAssignment(a:any): a is Assignment {
  return a && (a instanceof Assignment || a.__classType === 'Assignment');
}