import { IViewConstructor, VNodeOptions, Section, VNode, IView } from './vnode';
export interface TemplateOptions extends VNodeOptions {
    viewClass?: IViewConstructor;
}
export declare class Template {
    section: Section;
    vnode: VNode;
    private _renderers;
    options: TemplateOptions;
    constructor(vnode: VNode, options: TemplateOptions);
    view(context: any, options: any): IView;
}
export declare function template(vnode: VNode, options: TemplateOptions): Template;
