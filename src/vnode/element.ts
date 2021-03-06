
import {VNode, NodeType, AttributeMap, VNodeOptions,
  Renderer, ComponentConstructor, Marker, Section, DynamicAttributeMap,
  IView} from './vnode';
import {extend} from 'orange';
import {FragmentSection} from './fragmentsection';
import {NodeSection, NodeSectionMarker} from './nodesection';
import {ElementCreator} from '../transpiler';

export class Element implements VNode {
  nodeType = NodeType.Element
  tagName: string
  attributes: AttributeMap
  childNodes: VNode[]

  constructor(tagName: string, attributes: AttributeMap, children: VNode[]) {

    this.tagName = String(tagName).toLocaleLowerCase();
    this.childNodes = children;
    this.attributes = attributes || {};


    for (var i = 0; i < children.length; i++) children[i].parentNode = this;

  }

  render(options: VNodeOptions, renderers: Renderer[]): Promise<HTMLElement> {

    let components = options.components; // || {}

    if (components.has(this.tagName)) {
      return this._renderComponent(components.get(this.tagName), options, renderers)
    }

    return this._renderElement(options, renderers);

  }

  setAttributes(key: AttributeMap | string, value?: string) {
    if (typeof key === 'string') {
      this.attributes[<string>key] = value;
    } else {
      extend(this.attributes, key);
    }
  }

  _renderComponent(component: ComponentConstructor, options: VNodeOptions, renderers: Renderer[]): Promise<HTMLElement> {

    var section = new FragmentSection(options.document)

    renderers.push(new ComponentAttributeRenderer(component, section, this, this._splitAttributes(options), options))

    return Promise.resolve(section.render());
  }

  _renderElement(options: VNodeOptions, renderers: Renderer[]): Promise<HTMLElement> {

    let element = options.document.createElement(this.tagName);

    let _attr = this._splitAttributes(options);
    // Set static attributes
    for (let attrKey in _attr.staticAttributes) {
      element.setAttribute(attrKey, _attr.staticAttributes[attrKey]);
    }

    let r = this.childNodes.map(m => {
      return m.render(options, renderers);
    });

    return Promise.all(r).then(children => {
      children.forEach(child => {
        element.appendChild(<any>child);
      });
      if (Object.keys(_attr.dynamicAttributes).length) {

        renderers.push(new ElementAttributeRenderer(new NodeSection(options.document, element), options, _attr.dynamicAttributes))
      }

      return element;
    })

    /*for (let child of this.childNodes) {
      element.appendChild(child.render(options, renderers));
    }
    
    // Set dynamic attributes
    if (Object.keys(_attr.dynamicAttributes).length) {

      renderers.push(new ElementAttributeRenderer(new NodeSection(options.document, element), options, _attr.dynamicAttributes))
    }

    return element;*/

  }

  _splitAttributes(options: VNodeOptions) {

    var dynamicAttributes = {};
    var staticAttributes = {};

    if (options.attributes) {

      for (var key in this.attributes) {
        var attrClass: any = options.attributes.get(key);

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


export const element: ElementCreator = function (tagName: string, attributes: AttributeMap, ...children: VNode[]): Element {

  return new Element(tagName, attributes, children);
}

class ComponentAttributeRenderer implements Renderer {
  _marker: Marker
  section: Section
  componentClass: ComponentConstructor
  attributes: AttributeMap
  dynamicAttributes: DynamicAttributeMap
  options: VNodeOptions
  element: VNode

  constructor(component: ComponentConstructor, section: Section, element: VNode, attr: any, options: VNodeOptions) {
    this.section = section
    this.componentClass = component
    this.element = element
    this.options = options
    this.attributes = attr.staticAttributes
    this.dynamicAttributes = attr.dynamicAttributes

  }

  generate(root: Node, view: IView): Promise<void> {
    if (!this._marker) this._marker = this.section.createMarker();

    var ref = new this.componentClass(this._marker.createSection(root), this.element, this.attributes, view);
    if (Object.keys(this.dynamicAttributes).length) {

      _hydrateDynamicAttributes(ref, this.options, this.dynamicAttributes, view);
    }

    if (ref.update) view.bindings.push(ref);
    return ref.initialize();
  }
}

class ElementAttributeRenderer implements Renderer {
  _marker: NodeSectionMarker
  constructor(public section: NodeSection, public options: any, public attributes: any) {

  }

  generate(root: Node, view: IView): Promise<void> {
    if (!this._marker) this._marker = this.section.createMarker();

    _hydrateDynamicAttributes(this._marker.findNode(root), this.options, this.attributes, view)
    return Promise.resolve();
  }
}

function _hydrateDynamicAttributes(ref, options: VNodeOptions, dynamicAttributes, view: IView) {
  for (var key in dynamicAttributes) {
    var clazz = options.attributes.get(key);
    var attr = new clazz(ref, key, dynamicAttributes[key], view);
    if (attr.update) view.bindings.push(attr);
  }
}


