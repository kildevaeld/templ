import { BaseComponent } from './component';
import { VNode } from '../vnode/index';
export declare class Repeat extends BaseComponent {
    _children: VNode[];
    update(): void;
    setAttribute(key: string, value: any): void;
}
export declare var repeat: typeof Repeat;
