import { BaseComponent } from './component';
import { VNode } from '../vnode/index';
export declare class Repeat extends BaseComponent {
    _children: VNode[];
    initialize(): Promise<void>;
    update(): Promise<void>;
    update2(): void;
    setAttribute(key: string, value: any): void;
}
export declare var repeat: typeof Repeat;
