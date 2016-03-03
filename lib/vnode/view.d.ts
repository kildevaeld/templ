import { Bindable, Section, IView } from './vnode';
import { Template } from './template';
import { RunLoop } from '../runloop';
import { EventEmitter } from 'eventsjs';
export declare class View extends EventEmitter implements IView {
    section: Section;
    template: Template;
    bindings: Bindable[];
    _runloop: RunLoop;
    context: any;
    constructor(section: Section, template: Template, context: any, options?: any);
    update(): void;
    addListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): Function;
    removeListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): void;
    render(): Node;
    remove(): any;
}
