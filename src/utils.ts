

module utils {
  
  export function extend (obj:any, ...args:any[]): any {
    let a, k;
    for (a of args) {
      if (a !== Object(a)) continue;
      for (k in a) obj[k] = a[k];

    }
    return obj
  }  
  
  export function slice(obj, ...args): any {
    return Array.prototype.slice.apply(obj, args)
  } 


  export function extendClass<T>(parent:any,protoProps:any, staticProps?:any): T {
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent constructor.
    if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent` constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  const nativeBind = Function.prototype.bind

  export function bind(method: Function, context: any, ...args: any[]): Function {
    if (typeof method !== 'function') throw new Error('method not at function')

    if (nativeBind != null) return nativeBind.call(method, context, ...args)

    args = args || []

    let fnoop = function() { }

    let fBound = function() {
      let ctx = this instanceof fnoop ? this : context
      return method.apply(ctx, args.concat(utils.slice(arguments)))
    }

    fnoop.prototype = this.prototype
    fBound.prototype = new fnoop()

    return fBound
  }
}
