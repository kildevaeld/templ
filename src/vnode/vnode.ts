/// <reference path="template" />


module templ.vnode {

  export enum NodeType {
    Element=1, Fragment=11, Comment=8, Dynamic=-200, Text=-201
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

  export interface IView extends templ.IDelegator {
    bindings:Bindable[]
    section:Section
    template: Template
    context:any
    
		
  }
  
  export interface IViewConstructor {
    new (section:Section, template:Template, context:any, options?:any): IView
  }
  
  export interface Destroyable {
    destroy()
  }
  
  export interface Renderer {
    generate(node:Node, view:IView)
  }
  
  export interface Attribute extends Bindable {
    ref: Node
		key: string
		value: any
		view: vnode.IView
    //update?: () => void
    
  }
  
  export interface AttributeConstructor {
    new (ref:Node, key:string, value:any, view:vnode.IView): Attribute
  }
  
  export interface Component extends Bindable {
    setAttribute (key:string, value:any)
    removeAttribute (key:string)
  }
  
  export interface ComponentConstructor {
    new (section:Section, vnode:VNode, attributes:AttributeMap, view:IView): Component
  }
  
  export interface Bindable extends Destroyable {
    update?:(context?:any) => void
  }

  export interface Binding extends Bindable {
    setAttribute(key:string, value:string)
    //update(context?:any)
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
