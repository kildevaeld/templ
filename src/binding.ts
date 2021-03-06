'use strict';
import * as vnode from './vnode/index';
import {IRepository} from './repository';
import {TemplateOptions} from './vnode/template';
import * as utils from './utils';

export class Binding implements vnode.Binding {
    ref: Element
    view: vnode.IView
    _attributeClasses: IRepository<vnode.AttributeConstructor>
    _attrBindings: { [key: string]: vnode.Attribute } = {}
    _update: Function
    options: TemplateOptions
    constructor(ref: Element, view: vnode.IView) {
        this.ref = ref
        this.view = view
        this.options = view.template.options
        this._attributeClasses = this.options.attributes
    }

    setAttribute(key: string, value: string) {
        if (!this.setAsRegisteredAttribute(key, value)) {
            if (value != void 0) {
                this.ref.setAttribute(key, value);
            } else {
                //this.ref.removeAttribute(key);
            }
        }
    }

    setProperty(key: string, value: string) {
        if (!this.setAsRegisteredAttribute(key, value)) {

            // no node type? It's a registered component.
            if (!this.ref.nodeType) {
                this.ref.setAttribute(key, value);
            } else {
                this.ref[key] = value;
            }
        }
    }

    private setAsRegisteredAttribute(key: string, value: string): boolean {

        if (this._attrBindings[key]) {
            this._attrBindings[key].value = value;
        } else {
            var attrClass = this._attributeClasses.get(key);
            if (attrClass) {
                this._attrBindings[key] = new attrClass(this.ref, key, value, this.view);
            } else {
                return false;
            }
        }
        return true;
    }

    async update(context: any) {

        await this._update()
        for (let key in this._attrBindings) {
            await this._attrBindings[key].update()
        }
    }

    destroy() {
        for (let key in this._attrBindings) {
            this._attrBindings[key].destroy();
        }
    }
}


export function binding(initialize: () => void, update: (context) => Promise<void>): vnode.BindingContructor {
    return utils.extendClass<vnode.BindingContructor>(Binding, {
        initialize: initialize || function () { },
        _update: update || function () { return Promise.resolve() }
    });
}
