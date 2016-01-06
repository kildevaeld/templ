import { BaseAttribute } from './base';
import { Reference } from '../view';
export declare class ValueAttribute extends BaseAttribute {
    model: Reference;
    _autocompleteCheckInterval: number;
    initialize(): void;
    update(): void;
    _parseValue(value: any): any;
    _onInput(event: KeyboardEvent): void;
    _elementValue(value?: any): any;
}