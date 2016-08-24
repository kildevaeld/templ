import { IRepository } from './repository';
import * as vnode from './vnode/index';
export declare var version: string;
export interface TemplateOptions {
    document?: Document;
    attributes?: IRepository<vnode.AttributeConstructor>;
    components?: IRepository<vnode.ComponentConstructor>;
    viewClass?: vnode.IViewConstructor;
    modifiers?: (value: any) => any;
}
export declare function attribute(name: string, attr: vnode.AttributeConstructor | vnode.Attribute): void;
export declare function component(name: string, cmp: vnode.ComponentConstructor | vnode.ComponentConstructor): void;
export declare function modifier(name: string, func: (value: any) => any): void;
export declare function debugging(enabled: boolean): void;
export declare function compile(str: string, options?: TemplateOptions): vnode.Template;
