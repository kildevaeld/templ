/// <reference path="template" />


module vnode {

  export enum NodeType {
    Element, Fragment=11, Comment=8, Dynamic, Text
  }

  export interface VNodeCreator {
    (): VNode
  }

  export interface VNodeOptions {
    document: HTMLDocument
  }

  export interface VNode {
    nodeType: NodeType
    parentNode?:VNode
    render (option:VNodeOptions, renderes:Renderer[]): Node
  }

  export interface Section {
    node?:Node
    start?:Node
    end?:Node
    clone(): Section
    render(): Node
    remove()
  }

  export interface IView {
    bindings:Binding[]
    section:Section
    template: Template
    context:any
  }
  
  export interface Renderer {
    generate(node:Node, view:IView)
  }

  export interface Binding {
    setAttribute(key:string, value:string)
    update(context?:any)
  }
  
  export interface BindingContructor {
    new (ref:Node,view:IView): Binding
  }

  export type AttributeMap = {[key: string]: string}
  
  
  export function getNodeByPath (root:Node, path:string[]): Node {
      var c = root;
    
      for (var i = 0, n = path.length; i < n; i++) {
        c = c.childNodes[path[i]];
      }
    
      return c;
    
  }
  
  export function getNodePath(node:Node): string[] {
    var path = [];
    var p    = node.parentNode;
    var c    = node;
  
    while (p) {
  
      path.unshift(Array.prototype.indexOf.call(p.childNodes, c));
      c = p;
  
      p = p.parentNode;
  
      // virtual nodes - must be skipped
      while (p && p.nodeType > 12) p = p.parentNode;
    }
  
    return path;
  }

}
