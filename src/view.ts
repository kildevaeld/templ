'use strict';

import * as utils from './utils'
import * as vnode from './vnode';
//import {RunLoop} from './runloop';
const debug = utils.debug('view')

function _set(target, keypath, value) {

    var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
    var ct = target;
    var key;

    for (var i = 0, n = keys.length - 1; i < n; i++) {
        key = keys[i];
        if (!ct[key]) {
            ct[key] = {};
        }
        ct = ct[key];
    }

    ct[keys[keys.length - 1]] = value;
    return value;
}

export class Reference {
    gettable: boolean
    settable: boolean
    view: View
    path: string

    value(value?: any): any {
        if (arguments.length === 0) {
            return this.gettable ? this.view.get(this.path) : void 0;
        }
        if (this.settable) this.view.set(this.path, value)
    }


    constructor(view: View, path: string, gettable: boolean, settable: boolean) {
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
    view: View
    path: string
    value: () => any
    constructor(view: View, path: string, value: () => any) {
        this.view = view
        this.path = path
        this.value = value
        this.assign = utils.bind(this.assign, this);
        this.toString = utils.bind(this.toString, this);
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
    view: View
    keypath: string
    params: any[]
    constructor(view: View, keypath: string, params: any[]) {
        this.view = view;
        this.keypath = keypath;
        this.params = params||[];
    }

    call(...args:any[]) {
        args = args||[];
        let fn = this.view.get(this.keypath)
        if (fn == null || typeof fn !== 'function') {
            throw new Error("not exists or not function");
        }

        return fn.apply(this.view, this.params.concat(args))
    }

    toString(): string {
        let val = this.call();
        return val ? String(val) : '';
    }
}

export interface IDelegator {
    addListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean): Function
    removeListener(elm: Element, eventName: string, callback: string | EventListener, capture?: boolean)
}

export class View extends vnode.View {
    protected _delegator: IDelegator
    _callers: { [key: string]: Function } = {}
    _getters: any = {}
    //_runloop: RunLoop;
    parent: View


    get root(): View {
        if (this.parent == null) return this

        let root: View = this, tmp: View = root
        while (tmp) {
            tmp = <View>tmp.parent
            if (tmp) root = tmp
        }

        return root

    }

    getDelegator(): IDelegator {
        if (this._delegator) return this._delegator;
        let parent = this.parent
        while (parent != undefined) {
            if (parent._delegator) return parent._delegator
            parent = parent.parent

        }

        return null;
    }

    addListener(elm: Element, eventName: string, callback: EventListener | string, capture: boolean = false): Function {
        let delegator = this.getDelegator();
        if (delegator) {
            return delegator.addListener(elm, eventName, callback, capture)
        } else if (typeof callback === 'function') {
            return super.addListener(elm, eventName, callback, capture)
        }
    }

    removeListener(elm: Element, eventName: string, callback: EventListener | string, capture: boolean = false) {
        let delegator = this.getDelegator();
        if (delegator) {
            delegator.removeListener(elm, eventName, callback, capture)
        } else if (typeof callback === 'function') {
            super.removeListener(elm, eventName, callback, capture)
        }

    }

    get(keypath): any {

        if (!this.context) return void 0;
        var pt = typeof keypath !== "string" ? keypath.join(".") : keypath;

        var v;

        try {

            var getter;

            if (!(getter = this._getters[pt])) {
                getter = this._getters[pt] = new Function("return this." + pt);
            }

            v = getter.call(this.context);
        } catch (e) {

            v = void 0;
        }

        v = v != void 0 ? v : this.parent ? this.parent.get(keypath) : void 0;
        debug('get value "%s": %s', keypath, v)

        return v
    }

    constructor(section: vnode.Section, template: vnode.Template, public context: any, options: any = {}) {
        super(section, template, context, options)
        if (options.parent) {
            this.parent = options.parent
        }

        if (options.delegator) {
            this._delegator = options.delegator
        }

        //this._runloop = options.runloop;

    }


    set(path: string | string[], value: any) {
        debug('set value %s on context %j', value, this.context)
        if (!this.context) return void 0;
        if (typeof path === "string") path = (<any>path).split(".");
        var ret = _set(this.context, path, value);

        this.updateLater();
    }

    render() {
        this.update();
        var section = super.render()
        //this.transitions.enter();

        return section;
    }

    protected updateLater () {
        this._runloop.deferOnce(this);
    }

    ref(path: string, gettable: boolean, settable: boolean): Reference {
        debug('reference %s, gettable: %o, settabble: %o', path, gettable, settable)
        return new Reference(this, path, gettable, settable)
    }

    assign(path: string, value: any): Assignment {
        debug('assignment %s %s', path, value);
        return new Assignment(this, path, value);
    }

    call(keypath: string | string[], params) {
        var caller;
        var v;
        debug('call keypath "%s", args: "%o"', keypath, params)
        if (typeof keypath !== "string") keypath = (<string[]>keypath).join(".");

        if (!(caller = this._callers[<string>keypath])) {

            var ctxPath = ["this"].concat((<string>keypath).split("."));
            ctxPath.pop();
            caller = this._callers[<string>keypath] = new Function("params", "return this." + keypath + ".apply(" + ctxPath.join(".") + ", params);");
        }


		/*try {
			v = caller.call(this.context, params);
		} catch (e) {
			console.error('could not call', e)
		}

		return v != void 0 ? v : this.parent ? this.parent.call(keypath, params) : void 0;*/
        return new Call(this, <string>keypath, params);
    }

}
