
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

      this.tagName = tagName
      this.childNodes = children;
      this.attributes = {};


      for (var i = 0; i < children.length; i++) children[i].parentNode = this;

    }

    render(options: VNodeOptions): HTMLElement {

      return this._renderElement(options);

    }

    setAttributes(key: AttributeMap|string, value?: string) {
      if (typeof key === 'string') {
        this.attributes[<string>key] = value;
      } else {
        utils.extend(this.attributes, key);
      }
    }

    _renderElement(options: VNodeOptions): HTMLElement {

      let elm = options.document.createElement(this.tagName);

      let _attr = this._splitAttributes(options);

      for (let attrKey in _attr.staticAttributes) {
        elm.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
      }

      if (Object.keys(_attr.dynamicAttributes).length) {

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


class ElementAttributeRenderer implements vnode.Renderer {
  
  constructor (public section:vnode.Section, public options:any, public attributes:any) {
    
  }
  
  generate(root:Node, view:vnode.IView) {
    
  }
}
