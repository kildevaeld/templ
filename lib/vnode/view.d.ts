import { Bindable, Section, IView } from './vnode';
import { Template } from './template';
export declare class View implements IView {
    section: Section;
    template: Template;
    context: any;
    bindings: Bindable[];
    constructor(section: Section, template: Template, context: any, options?: any);
    update(): void;
    addListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): Function;
    removeListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): void;
    render(): Node;
    remove(): any;
}
