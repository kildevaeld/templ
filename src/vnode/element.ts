/// <reference path="nodesection" />

/// <reference path="vnode" />
/// <reference path="../utils" />
/// <reference path="../transpiler" />

module vnode {
  
  export class Element implements VNode {
    nodeType = NodeType.Element
    tagName: string
    attributes: AttributeMap
    childNodes: VNode[]

    constructor(tagName: string, attributes: AttributeMap, children: VNode[]=[]) {

      this.tagName = String(tagName).toLocaleLowerCase();
      this.childNodes = children;
      this.attributes = attributes||{};
      

      for (var i = 0; i < children.length; i++) children[i].parentNode = this;

    }

    render(options: VNodeOptions, renderers:Renderer[]): HTMLElement {

      let components = options.components||{}
      
      if (components[this.tagName]) {
      
        return this._renderComponent(components[this.tagName],options,renderers)
      }

      return this._renderElement(options, renderers);

    }

    setAttributes(key: AttributeMap|string, value?: string) {
      if (typeof key === 'string') {
        this.attributes[<string>key] = value;
      } else {
        utils.extend(this.attributes, key);
      }
    }

    _renderComponent(component:ComponentConstructor, options:VNodeOptions, renderers:Renderer[]): HTMLElement {
      
      var section = new FragmentSection(options.document)
     
      renderers.push(new ComponentAttributeRenderer(component,section,this,this._splitAttributes(options),options))
      
      return <any>section.render()
    }

    _renderElement(options: VNodeOptions, renderers:Renderer[]): HTMLElement {

      let elm = options.document.createElement(this.tagName);

      let _attr = this._splitAttributes(options);
      
      for (let attrKey in _attr.staticAttributes) {
        elm.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
      }
      
      if (Object.keys(_attr.dynamicAttributes).length) {
        
        renderers.push(new ElementAttributeRenderer(new NodeSection(options.document, elm),options,_attr.dynamicAttributes))
      }

      return elm;

    }

    _splitAttributes(options) {

      var dynamicAttributes = {};
      var staticAttributes = {};

      if (options.attributes) {
        
        for (var key in this.attributes) {
          var attrClass = options.attributes[key];
          
          if (attrClass && (!attrClass.test || attrClass.test(this, key, this.attributes[key]))) {
            dynamicAttributes[key] = this.attributes[key];
          } else {
            staticAttributes[key] = this.attributes[key];
          }
        }
      } else {
        staticAttributes = this.attributes;
      }


      return {
        dynamicAttributes: dynamicAttributes,
        staticAttributes: staticAttributes
      };
    }

  }


  export const element: parser.ElementCreator = function (tagName: string, attributes: AttributeMap, children: VNode[]): Element {
    
    return new Element(tagName, attributes, children);
  }
}

class ComponentAttributeRenderer implements vnode.Renderer {
  _marker: vnode.Marker
  section: vnode.Section
  componentClass: vnode.ComponentConstructor
  attributes: vnode.AttributeMap
  dynamicAttributes: vnode.DynamicAttributeMap
  options:vnode.VNodeOptions
  element:vnode.VNode
  
  constructor(component:vnode.ComponentConstructor, section:vnode.Section, element:vnode.VNode,attr:any, options:vnode.VNodeOptions) {
    this.section = section
    this.componentClass = component
    this.element = element
    this.options = options
    this.attributes = attr.staticAttributes
    this.dynamicAttributes = attr.dynamicAttributes
    
  }
  
  generate(root:Node, view:vnode.IView) {
    if (!this._marker) this._marker = this.section.createMarker();
    
    var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
    if (Object.keys(this.dynamicAttributes).length) {
      _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
    }
   
    if (ref.update) view.bindings.push(ref);
    
  }
}

class ElementAttributeRenderer implements vnode.Renderer {
  _marker: vnode.NodeSectionMarker
  constructor (public section:vnode.NodeSection, public options:any, public attributes:any) {
    
  }
  
  generate(root:Node, view:vnode.IView) {
    if (!this._marker) this._marker = this.section.createMarker();
    
    _hydrateDynamicAttributes(this._marker.findNode(root), this.options,this.attributes,view)
  }
}

function _hydrateDynamicAttributes(ref, options, dynamicAttributes, view) {
  for (var key in dynamicAttributes) {
    var clazz = options.attributes[key];
    var attr = new clazz(ref, key, dynamicAttributes[key], view);
    if (attr.update) view.bindings.push(attr);
  }
}