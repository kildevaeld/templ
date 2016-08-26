import * as vnode from './vnode/index';
import { IRepository } from './repository';
import { TemplateOptions } from './vnode/template';
export declare class Binding implements vnode.Binding {
    ref: Element;
    view: vnode.IView;
    _attributeClasses: IRepository<vnode.AttributeConstructor>;
    _attrBindings: {
        [key: string]: vnode.Attribute;
    };
    _update: Function;
    options: TemplateOptions;
    constructor(ref: Element, view: vnode.IView);
    setAttribute(key: string, value: string): void;
    setProperty(key: string, value: string): void;
    private setAsRegisteredAttribute(key, value);
    update(context: any): Promise<void>;
    destroy(): void;
}
export declare function binding(initialize: () => void, update: (context) => Promise<void>): vnode.BindingContructor;
