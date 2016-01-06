export declare function extend(obj: any, ...args: any[]): any;
export declare function slice(obj: any, ...args: any[]): any;
export declare function extendClass<T>(parent: any, protoProps: any, staticProps?: any): T;
export declare function bind<T extends Function>(method: T, context: any, ...args: any[]): T;
export declare class Debug {
    static enable(enabled: boolean, namespace?: string): void;
    static loggers: {
        [key: string]: Debug;
    };
    static formatters: {
        [key: string]: (args: any) => string;
    };
    static create(namespace: string): (...args: any[]) => void;
    enabled: boolean;
    namespace: string;
    constructor(namespace: string);
    debug(...args: any[]): void;
    private _log(...args);
    private _coerce(val);
    private _formatArgs(args);
}
export declare function debug(namespace: string): (...args: any[]) => void;
