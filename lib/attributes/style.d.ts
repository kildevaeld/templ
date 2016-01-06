import { BaseAttribute } from './base';
export declare class StyleAttribute extends BaseAttribute {
    _currentStyles: {
        [key: string]: string;
    };
    initialize(): void;
    update(): void;
}
