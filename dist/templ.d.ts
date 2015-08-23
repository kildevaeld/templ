declare module parser {
    var parser: any;
}
declare module vnode {
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
declare module vnode {
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
declare module vnode {
    function section(document: Document, node: Node): Section;
}
declare module vnode {
    class View implements IView {
        section: Section;
        template: Template;
        context: any;
        bindings: Binding[];
        constructor(section: Section, template: Template, context: any, options?: any);
        update(): void;
        render(): Node;
        remove(): any;
    }
}
declare module vnode {
    interface TemplateOptions extends VNodeOptions {
        viewClass?: new (section: Section, template: Template, context: any, options?: any) => IView;
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
declare module vnode {
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
    interface IView {
        bindings: Binding[];
        section: Section;
        template: Template;
        context: any;
    }
    interface Renderer {
        generate(node: Node, view: IView): any;
    }
    interface Attribute {
        ref: Node;
        key: string;
        value: any;
        view: vnode.IView;
        update?: () => void;
    }
    interface AttributeConstructor {
        new (ref: Node, key: string, value: any, view: vnode.IView): Attribute;
    }
    interface Component {
        setAttribute(key: string, value: any): any;
        removeAttribute(key: string): any;
    }
    interface ComponentConstructor {
        new (section: Section, vnode: VNode, attributes: AttributeMap, view: IView): any;
    }
    interface Binding {
        setAttribute(key: string, value: string): any;
        update(context?: any): any;
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
declare module parser {
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
    class Transpiler {
        _refCounter: number;
        _refs: any[];
        constructor();
        /**
         */
        transpile(source: string): string;
        /**
         */
        _root(elements: any): string;
        /**
         */
        _expression(expression: any): any;
        /**
         * check for stuff like <li repeat.each={{items}}></li>
         */
        _element(expression: any): string;
        /**
         */
        _doctype(expression: any): string;
        /**
         */
        _children(children: any): any;
        /**
         */
        _element2(expression: any): string;
        /**
         */
        __addReference(expression: any): string;
        /**
         */
        _block(expression: any): string;
        /**
         */
        _text(expression: any): string;
        /**
         */
        _comment(expression: any): string;
        /**
         */
        _hash(expression: any): string;
        /**
         */
        _script(expression: any): any;
        /**
         */
        _referenceKeyPath(expression: any): any[];
        /**
         */
        _reference(expression: any): string;
        /**
         */
        _string(expression: any): string;
        /**
         */
        _operator(expression: any): any;
        /**
         */
        _condition(expression: any): string;
        /**
         */
        _literal(expression: any): any;
        /**
         */
        _not(expression: any): string;
        /**
         */
        _negative(expression: any): string;
        /**
         */
        _call(expression: any): string;
        /**
         */
        _modifier(expression: any): string;
        /**
         */
        _group(expression: any): string;
        /**
         */
        __findExpressions(type: any, expr: any): any[];
        /**
         */
        __traverse(expr: any, iterator: any): void;
    }
}
/**
 */
declare function _dashToCamelCase(string: any): any;
declare module parser {
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
declare module engine {
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
    }
    function binding(initialize: () => void, update: (context) => void): vnode.BindingContructor;
}
declare module vnode {
    class Text implements VNode {
        nodeType: NodeType;
        nodeValue: string;
        constructor(nodeValue: string);
        render(options: VNodeOptions): Node;
    }
    var text: parser.TextCreator;
}
declare module vnode {
    class Dynamic implements VNode {
        nodeType: NodeType;
        vnode: VNode;
        bindingClass: BindingContructor;
        constructor(vnode: VNode, bindingClass: BindingContructor);
        render(options: VNodeOptions, renderers: Renderer[]): Node;
        _renderElement(options: VNodeOptions, renderers: Renderer[]): Node;
        _renderComponent(options: VNodeOptions, renderers: Renderer[]): Node;
    }
    const dynamic: parser.DynamicCreator;
}
declare class DynamicComponentRenderer implements vnode.Renderer {
    renderer: vnode.Renderer;
    bindingClass: vnode.BindingContructor;
    options: vnode.VNodeOptions;
    constructor(renderer: vnode.Renderer, bindingClass: vnode.BindingContructor, options: vnode.VNodeOptions);
    generate(root: Node, view: vnode.IView): void;
}
declare class DynamicRenderer implements vnode.Renderer {
    options: any;
    ref: Node;
    bindingClass: any;
    _refPath: string[];
    constructor(node: Node, bindingClass: vnode.BindingContructor, options?: any);
    generate(root: Node, view: vnode.IView): void;
}
declare module vnode {
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
    const element: parser.ElementCreator;
}
declare class ComponentAttributeRenderer implements vnode.Renderer {
    _marker: vnode.Marker;
    section: vnode.Section;
    componentClass: vnode.ComponentConstructor;
    attributes: vnode.AttributeMap;
    dynamicAttributes: vnode.DynamicAttributeMap;
    options: vnode.VNodeOptions;
    element: vnode.VNode;
    constructor(component: vnode.ComponentConstructor, section: vnode.Section, element: vnode.VNode, attr: any, options: vnode.VNodeOptions);
    generate(root: Node, view: vnode.IView): void;
}
declare class ElementAttributeRenderer implements vnode.Renderer {
    section: vnode.NodeSection;
    options: any;
    attributes: any;
    _marker: vnode.NodeSectionMarker;
    constructor(section: vnode.NodeSection, options: any, attributes: any);
    generate(root: Node, view: vnode.IView): void;
}
declare function _hydrateDynamicAttributes(ref: any, options: any, dynamicAttributes: any, view: any): void;
declare module vnode {
    class Fragment implements VNode {
        nodeType: NodeType;
        childNodes: VNode[];
        constructor(children: VNode[]);
        render(options: VNodeOptions, renderers: Renderer[]): DocumentFragment;
    }
    const fragment: parser.FragmentCreator;
}
declare module vnode {
    class Comment implements VNode {
        nodeType: NodeType;
        nodeValue: string;
        constructor(nodeValue: string);
        render(options: VNodeOptions): Node;
    }
    const comment: parser.CommentCreator;
}
declare const debug: (...args: any[]) => void;
declare function _set(target: any, keypath: any, value: any): any;
declare module templ {
    class Reference {
        gettable: boolean;
        settable: boolean;
        view: templ.View;
        path: string;
        value(value?: any): any;
        constructor(view: templ.View, path: string, gettable: boolean, settable: boolean);
        toString(): string;
    }
    class View extends vnode.View {
        context: any;
        _callers: {
            [key: string]: Function;
        };
        _getters: any;
        parent: View;
        get(keypath: any): any;
        constructor(section: vnode.Section, template: vnode.Template, context: any, options?: any);
        set(path: string | string[], value: any): any;
        render(): Node;
        ref(path: string, gettable: boolean, settable: boolean): Reference;
        call(keypath: string | string[], params: any): any;
    }
}
declare module attributes {
    class BaseAttribute implements vnode.Attribute {
        ref: Node;
        key: string;
        value: any;
        view: vnode.IView;
        constructor(ref: Node, key: string, value: any, view: vnode.IView);
        initialize(): void;
        update(): void;
    }
}
declare module attributes {
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
declare module attributes {
    var value: typeof ValueAttribute;
}
declare module components {
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
    }
}
declare module components {
    class Repeat extends BaseComponent {
        _children: vnode.VNode[];
        update(): void;
        setAttribute(key: string, value: any): void;
    }
}
declare module components {
    const repeat: typeof Repeat;
}
declare let virtualnode: {
    text: parser.TextCreator;
    dynamic: parser.DynamicCreator;
    comment: parser.CommentCreator;
    element: parser.ElementCreator;
    fragment: parser.FragmentCreator;
    template: (vnode: vnode.VNode, options: vnode.TemplateOptions) => vnode.Template;
};
declare module templ {
    module compiler {
        var compile: typeof parser.compile;
        var vnode: {
            text: parser.TextCreator;
            dynamic: parser.DynamicCreator;
            comment: parser.CommentCreator;
            element: parser.ElementCreator;
            fragment: parser.FragmentCreator;
            template: (vnode: vnode.VNode, options: vnode.TemplateOptions) => vnode.Template;
        };
    }
    interface Template {
        view(context: any, options: any): vnode.IView;
    }
    function debugging(enabled: boolean): void;
    function compile(str: string): Template;
}
