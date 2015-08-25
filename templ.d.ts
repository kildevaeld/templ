declare module "templ" {
	export = templ
}

declare module templ {
    var version: string;
    interface TemplateOptions {
        document?: Document;
        attributes?: {
            [key: string]: vnode.AttributeConstructor;
        };
        components?: {
            [key: string]: vnode.ComponentConstructor;
        };
        viewClass?: vnode.IViewConstructor;
        modifiers?: (value: any) => any;
    }
    function attribute(name: string, attr: vnode.AttributeConstructor | vnode.Attribute): void;
    function component(name: string, cmp: vnode.ComponentConstructor | vnode.ComponentConstructor): void;
    function modifier(name: string, func: (value: any) => any): void;
    function debugging(enabled: boolean): void;
    function compile(str: string, options?: TemplateOptions): vnode.Template;
}
declare module templ.compiler {
    var parser: any;
}
declare module templ.vnode {
    class NodeSection implements Section {
        document: Document;
        node: Node;
        constructor(document: Document, node: Node);
        createMarker(): NodeSectionMarker;
        appendChild(node: Node): void;
        render(): Node;
        remove(): void;
        removeChildren(): void;
        clone(): NodeSection;
    }
    class NodeSectionMarker implements vnode.Marker {
        document: Document;
        path: string[];
        constructor(document: Document, path: string[]);
        createSection(root: Node): NodeSection;
        findNode(root: any): Node;
    }
}
declare module templ.vnode {
    class FragmentSection implements Section {
        document: Document;
        start: Node;
        end: Node;
        node: Node;
        constructor(document: Document, start?: Node, end?: Node);
        appendChild(node: Node): void;
        render(): Node;
        remove(): FragmentSection;
        removeChildNodes(): DocumentFragment;
        createMarker(): FragmentSectionMarker;
        clone(): FragmentSection;
        _getChildNodes(): Node[];
    }
    class FragmentSectionMarker implements vnode.Marker {
        document: Document;
        startPath: string[];
        endPath: string[];
        constructor(document: Document, startPath: string[], endPath: string[]);
        createSection(root: Node): vnode.FragmentSection;
    }
}
declare module templ.vnode {
    function section(document: Document, node: Node): Section;
}
declare module templ.vnode {
    class View implements IView {
        section: Section;
        template: Template;
        context: any;
        bindings: Bindable[];
        constructor(section: Section, template: Template, context: any, options?: any);
        update(): void;
        addListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): void;
        removeListener(elm: Node, eventName: string, callback: EventListener, capture?: boolean): void;
        render(): Node;
        remove(): any;
    }
}
declare module templ.vnode {
    interface TemplateOptions extends VNodeOptions {
        viewClass?: IViewConstructor;
    }
    class Template {
        section: Section;
        vnode: VNode;
        private _renderers;
        options: TemplateOptions;
        constructor(vnode: VNode, options: TemplateOptions);
        view(context: any, options: any): IView;
    }
    function template(vnode: VNode, options: TemplateOptions): Template;
}
declare module templ.vnode {
    enum NodeType {
        Element = 1,
        Fragment = 11,
        Comment = 8,
        Dynamic = -200,
        Text = -201,
    }
    interface VNodeCreator {
        (): VNode;
    }
    interface VNodeOptions {
        document: HTMLDocument;
        attributes: {
            [key: string]: AttributeConstructor;
        };
        components: {
            [key: string]: ComponentConstructor;
        };
    }
    interface VNode {
        nodeType: NodeType;
        parentNode?: VNode;
        render(option: VNodeOptions, renderes: Renderer[]): Node;
        childNodes?: VNode[];
    }
    interface Section {
        node?: Node;
        start?: Node;
        end?: Node;
        clone(): Section;
        render(): Node;
        remove(): any;
        appendChild(child: Node): any;
        createMarker(): Marker;
    }
    interface Marker {
        createSection(root: Node): Section;
    }
    interface IView extends templ.IDelegator {
        bindings: Bindable[];
        section: Section;
        template: Template;
        context: any;
    }
    interface IViewConstructor {
        new (section: Section, template: Template, context: any, options?: any): IView;
    }
    interface Destroyable {
        destroy(): any;
    }
    interface Renderer {
        generate(node: Node, view: IView): any;
    }
    interface Attribute extends Bindable {
        ref: Node;
        key: string;
        value: any;
        view: vnode.IView;
    }
    interface AttributeConstructor {
        new (ref: Node, key: string, value: any, view: vnode.IView): Attribute;
    }
    interface Component extends Bindable {
        setAttribute(key: string, value: any): any;
        removeAttribute(key: string): any;
    }
    interface ComponentConstructor {
        new (section: Section, vnode: VNode, attributes: AttributeMap, view: IView): Component;
    }
    interface Bindable extends Destroyable {
        update?: (context?: any) => void;
    }
    interface Binding extends Bindable {
        setAttribute(key: string, value: string): any;
    }
    interface BindingContructor {
        new (ref: Node, view: IView): Binding;
    }
    type AttributeMap = {
        [key: string]: string;
    };
    type DynamicAttributeMap = {
        [key: string]: AttributeConstructor;
    };
    function getNodeByPath(root: Node, path: string[]): Node;
    function getNodePath(node: Node): string[];
}
declare module templ.compiler {
    interface BindingCreator {
        (intializer: () => void, update: (context) => void): vnode.BindingContructor;
    }
    interface FragmentCreator {
        (childen: vnode.VNode[]): vnode.Fragment;
    }
    interface ElementCreator {
        (tagName: string, attributes: vnode.AttributeMap, ...children: vnode.VNode[]): vnode.Element;
    }
    interface TextCreator {
        (nodeValue: string): vnode.Text;
    }
    interface CommentCreator {
        (nodeValue: string): vnode.Comment;
    }
    interface DynamicCreator {
        (node: vnode.VNode, bindingClass: vnode.BindingContructor): vnode.Dynamic;
    }
    interface TranspilerFunc {
        (fragment: FragmentCreator, element: ElementCreator, text: TextCreator, comment: CommentCreator, dynamic: DynamicCreator, createBindingClass: BindingCreator): vnode.VNode;
    }
    function transpile(source: string): string;
}
/**
 */
declare function _dashToCamelCase(string: any): any;
declare module templ.compiler {
    function compile(src: string, options?: any): TranspilerFunc;
}
declare module utils {
    function extend(obj: any, ...args: any[]): any;
    function slice(obj: any, ...args: any[]): any;
    function extendClass<T>(parent: any, protoProps: any, staticProps?: any): T;
    function bind<T extends Function>(method: T, context: any, ...args: any[]): T;
    class Debug {
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
        _log(...args: any[]): any;
        _coerce(val: any): any;
        _formatArgs(args: any): any[];
    }
    function debug(namespace: string): (...args: any[]) => void;
}
declare module templ {
    class Binding implements vnode.Binding {
        ref: Element;
        view: vnode.IView;
        _attributeClasses: {
            [key: string]: vnode.AttributeConstructor;
        };
        _attrBindings: {
            [key: string]: vnode.Attribute;
        };
        _update: Function;
        options: any;
        constructor(ref: Element, view: vnode.IView);
        setAttribute(key: string, value: string): void;
        private setAsRegisteredAttribute(key, value);
        update(context: any): void;
        destroy(): void;
    }
    function binding(initialize: () => void, update: (context) => void): vnode.BindingContructor;
}
declare const debug: (...args: any[]) => void;
declare function _set(target: any, keypath: any, value: any): any;
declare module templ {
    class Reference {
        gettable: boolean;
        settable: boolean;
        view: View;
        path: string;
        value(value?: any): any;
        constructor(view: View, path: string, gettable: boolean, settable: boolean);
        toString(): string;
    }
    class Assignment {
        view: View;
        path: string;
        value: () => any;
        constructor(view: View, path: string, value: () => any);
        assign(value?: (any)): void;
        toString(): string;
    }
    interface IDelegator {
        addListener(elm: Element, eventName: string, callback: (e: any) => void, capture?: boolean): any;
        removeListener(elm: Element, eventName: string, callback: (e: any) => void, capture?: boolean): any;
    }
    class View extends vnode.View {
        context: any;
        _callers: {
            [key: string]: Function;
        };
        _getters: any;
        parent: View;
        _delegator: IDelegator;
        root(): View;
        _getDelegator(): IDelegator;
        addListener(elm: Element, eventName: string, callback: EventListener, capture?: boolean): void;
        removeListener(elm: Element, eventName: string, callback: EventListener, capture?: boolean): void;
        get(keypath: any): any;
        constructor(section: vnode.Section, template: vnode.Template, context: any, options?: any);
        set(path: string | string[], value: any): any;
        render(): Node;
        ref(path: string, gettable: boolean, settable: boolean): Reference;
        assign(path: string, value: any): Assignment;
        call(keypath: string | string[], params: any): any;
    }
}
declare module templ.vnode {
    class Comment implements VNode {
        nodeType: NodeType;
        nodeValue: string;
        constructor(nodeValue: string);
        render(options: VNodeOptions): Node;
    }
    const comment: compiler.CommentCreator;
}
declare module templ.vnode {
    class Dynamic implements VNode {
        nodeType: NodeType;
        vnode: VNode;
        bindingClass: BindingContructor;
        constructor(vnode: VNode, bindingClass: BindingContructor);
        render(options: VNodeOptions, renderers: Renderer[]): Node;
        _renderElement(options: VNodeOptions, renderers: Renderer[]): Node;
        _renderComponent(options: VNodeOptions, renderers: Renderer[]): Node;
    }
    const dynamic: compiler.DynamicCreator;
}
declare module templ.vnode {
    class Element implements VNode {
        nodeType: NodeType;
        tagName: string;
        attributes: AttributeMap;
        childNodes: VNode[];
        constructor(tagName: string, attributes: AttributeMap, children: VNode[]);
        render(options: VNodeOptions, renderers: Renderer[]): HTMLElement;
        setAttributes(key: AttributeMap | string, value?: string): void;
        _renderComponent(component: ComponentConstructor, options: VNodeOptions, renderers: Renderer[]): HTMLElement;
        _renderElement(options: VNodeOptions, renderers: Renderer[]): HTMLElement;
        _splitAttributes(options: any): {
            dynamicAttributes: {};
            staticAttributes: {};
        };
    }
    const element: compiler.ElementCreator;
}
declare module templ.vnode {
    class Fragment implements VNode {
        nodeType: NodeType;
        childNodes: VNode[];
        constructor(children: VNode[]);
        render(options: VNodeOptions, renderers: Renderer[]): DocumentFragment;
    }
    const fragment: compiler.FragmentCreator;
}
declare module templ.vnode {
    class Text implements VNode {
        nodeType: NodeType;
        nodeValue: string;
        constructor(nodeValue: string);
        render(options: VNodeOptions): Node;
    }
    var text: compiler.TextCreator;
}
declare module templ.attributes {
    class BaseAttribute implements vnode.Attribute {
        ref: Node;
        key: string;
        value: any;
        view: vnode.IView;
        constructor(ref: Node, key: string, value: any, view: vnode.IView);
        initialize(): void;
        update(): void;
        destroy(): void;
    }
}
declare module templ.attributes {
    class ValueAttribute extends BaseAttribute {
        model: templ.Reference;
        _autocompleteCheckInterval: number;
        initialize(): void;
        update(): void;
        _parseValue(value: any): any;
        _onInput(event: KeyboardEvent): void;
        _elementValue(value?: any): any;
    }
}
declare module templ.attributes {
    class EventAttribute extends BaseAttribute {
        event: string;
        initialize(): void;
        _onEvent(e: any): void;
        destroy(): void;
    }
    class KeyCodeAttribute extends EventAttribute {
        keyCodes: number[];
        constructor(ref: Node, key: string, value: any, view: vnode.IView);
        _onEvent(event: any): void;
    }
    class ClickAttribute extends EventAttribute {
    }
    class OnEnterAttribute extends KeyCodeAttribute {
        keyCodes: number[];
    }
    class OnEscapeAttribute extends KeyCodeAttribute {
        KeyCodes: number[];
    }
}
declare module templ.attributes {
    var value: typeof ValueAttribute;
    var onclick: typeof ClickAttribute;
    var onenter: typeof OnEnterAttribute;
    var onescape: typeof OnEscapeAttribute;
    var checked: typeof ValueAttribute;
    var style: typeof StyleAttribute;
}
declare module templ.attributes {
    class StyleAttribute extends BaseAttribute {
        _currentStyles: {
            [key: string]: string;
        };
        initialize(): void;
        update(): void;
    }
}
declare module templ.components {
    class BaseComponent implements vnode.Component {
        section: vnode.Section;
        vnode: vnode.VNode;
        attributes: vnode.AttributeMap;
        view: vnode.IView;
        document: Document;
        childTemplate: vnode.Template;
        constructor(section: vnode.Section, vvnode: vnode.VNode, attributes: vnode.AttributeMap, view: vnode.IView);
        initialize(): void;
        setAttribute(key: string, value: any): void;
        removeAttribute(key: string): void;
        destroy(): void;
    }
}
declare module templ.components {
    class Repeat extends BaseComponent {
        _children: vnode.VNode[];
        update(): void;
        setAttribute(key: string, value: any): void;
    }
}
declare module templ.components {
    const repeat: typeof Repeat;
}
declare module modifiers {
    function uppercase(value: any): string;
    function lowercase(value: any): string;
    function titlecase(value: any): any;
    function json(value: any, count: any, delimiter: any): any;
    function isNaN(value: any): any;
    const round: (x: number) => number;
}
