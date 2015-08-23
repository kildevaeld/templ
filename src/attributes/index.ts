
/// <reference path="value" />
/// <reference path="../vnode/vnode" />
/// <reference path="../utils" />
/// <reference path="base" />


module attributes {
	export var value = ValueAttribute

  export function add (name:string, attribute:vnode.AttributeConstructor|Object) {
    if (typeof attribute !== 'function') {
      attribute = utils.extendClass.call(BaseAttribute, attribute)
    }
    attributes[name] = attribute;
  }

}