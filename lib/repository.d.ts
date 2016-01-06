export interface IRepository<T> {
    set(key: string, value: T): any;
    get(key: string): T;
    has(key: string): boolean;
    delete(key: string): any;
}
export declare class Repository<T> implements IRepository<T> {
    values: {
        [key: string]: T;
    };
    constructor(values?: {
        [key: string]: T;
    });
    set(key: string, value: T): void;
    get(key: string): T;
    has(key: string): boolean;
    delete(key: string): void;
}
