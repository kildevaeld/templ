declare module parser {
    var parser: any;
}
declare module vnode {
    class NodeSection implements Section {
        document: Document;
        node: Node;
        constructor(document: Document, node: Node);
        appendChild(node: Node): void;
        render(): Node;
        remove(): void;
        removeChildren(): void;
        clone(): NodeSection;
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
        createMarker(): Marker;
        clone(): FragmentSection;
        _getChildNodes(): Node[];
    }
}
declare class Marker {
    document: Document;
    startPath: string[];
    endPath: string[];
    constructor(document: Document, startPath: string[], endPath: string[]);
    createSection(root: Node): vnode.FragmentSection;
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
    interface TemplateOptions {
        document: Document;
        viewClass: new (section: Section, template: Template, context: any, options?: any) => IView;
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
        Element = 0,
        Fragment = 11,
        Comment = 8,
        Dynamic = 9,
        Text = 10,
    }
    interface VNodeCreator {
        (): VNode;
    }
    interface VNodeOptions {
        document: HTMLDocument;
    }
    interface VNode {
        nodeType: NodeType;
        parentNode?: VNode;
        render(option: VNodeOptions, renderes: Renderer[]): Node;
    }
    interface Section {
        node?: Node;
        start?: Node;
        end?: Node;
        clone(): Section;
        render(): Node;
        remove(): any;
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
        (tagName: string, attributes: vnode.AttributeMap, children: vnode.VNode[]): vnode.Element;
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
    function bind(method: Function, context: any, ...args: any[]): Function;
}
declare module engine {
    class Binding implements vnode.Binding {
        ref: Node;
        view: vnode.IView;
        _update: Function;
        constructor(ref: Node, view: vnode.IView);
        setAttribute(key: string, value: string): void;
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
    }
    const dynamic: parser.DynamicCreator;
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
        constructor(tagName: string, attributes: AttributeMap, children?: VNode[]);
        render(options: VNodeOptions): HTMLElement;
        setAttributes(key: AttributeMap | string, value?: string): void;
        _renderElement(options: VNodeOptions): HTMLElement;
        _splitAttributes(options: any): {
            dynamicAttributes: {};
            staticAttributes: {};
        };
    }
    const element: parser.ElementCreator;
}
declare class ElementAttributeRenderer implements vnode.Renderer {
    section: vnode.Section;
    options: any;
    attributes: any;
    constructor(section: vnode.Section, options: any, attributes: any);
    generate(root: Node, view: vnode.IView): void;
}
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
        get(key: any): any;
        set(path: string | string[], value: any): any;
        ref(path: string, gettable: boolean, settable: boolean): Reference;
        call(): void;
    }
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
    function compile(str: string): Template;
}
