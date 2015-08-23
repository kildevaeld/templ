/// <reference path="template" />


module vnode {

  export enum NodeType {
    Element=1, Fragment=11, Comment=8, Dynamic, Text
  }

  export interface VNodeCreator {
    (): VNode
  }

  export interface VNodeOptions {
    document: HTMLDocument
    attributes: {[key:string]: AttributeConstructor}
		components: {[key: string]: ComponentConstructor}
  }

  export interface VNode {
    nodeType: NodeType
    parentNode?:VNode
    render (option:VNodeOptions, renderes:Renderer[]): Node
    childNodes?:VNode[]
  }

  export interface Section {
    node?:Node
    start?:Node
    end?:Node
    clone(): Section
    render(): Node
    remove()
    appendChild(child:Node)
    createMarker(): Marker
  }
  
  export interface Marker {
    createSection(root:Node): Section
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
  
  export interface Attribute {
    ref: Node
		key: string
		value: any
		view: vnode.IView
    update?: () => void
    
  }
  
  export interface AttributeConstructor {
    new (ref:Node, key:string, value:any, view:vnode.IView): Attribute
  }
  
  export interface Component {
    setAttribute (key:string, value:any)
    removeAttribute (key:string) 
  }
  
  export interface ComponentConstructor {
    new (section:Section, vnode:VNode, attributes:AttributeMap, view:IView)
  }

  export interface Binding {
    setAttribute(key:string, value:string)
    update(context?:any)
  }
  
  export interface BindingContructor {
    new (ref:Node,view:IView): Binding
  }

  export type AttributeMap = {[key: string]: string}
  
  export type DynamicAttributeMap = {[key: string]: AttributeConstructor }
  
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
