import * as vnode from './vnode';
export declare function compile(src: string, options?: any): TranspilerFunc;
export interface BindingCreator {
    (intializer: () => void, update: (context) => void): vnode.BindingContructor;
}
export interface FragmentCreator {
    (childen: vnode.VNode[]): vnode.Fragment;
}
export interface ElementCreator {
    (tagName: string, attributes: vnode.AttributeMap, ...children: vnode.VNode[]): vnode.Element;
}
export interface TextCreator {
    (nodeValue: string): vnode.Text;
}
export interface CommentCreator {
    (nodeValue: string): vnode.Comment;
}
export interface DynamicCreator {
    (node: vnode.VNode, bindingClass: vnode.BindingContructor): vnode.Dynamic;
}
export interface TranspilerFunc {
    (fragment: FragmentCreator, element: ElementCreator, text: TextCreator, comment: CommentCreator, dynamic: DynamicCreator, createBindingClass: BindingCreator): vnode.VNode;
}
export declare function transpile(source: string): string;
