'use strict';

import {extend} from 'orange';



/*export function extend(obj: any, ...args: any[]): any {
  let a, k;
  for (a of args) {
    if (a !== Object(a)) continue;
    for (k in a) obj[k] = a[k];

  }
  return obj
}

export function slice(obj, ...args): any {
  return Array.prototype.slice.apply(obj, args)
}*/

export function extendClass<T>(parent: any, protoProps: any, staticProps?: any): T {
  var child;

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent constructor.
  if (protoProps && Object.prototype.hasOwnProperty.call(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function() { return parent.apply(this, arguments); };
  }

  // Add static properties to the constructor function, if supplied.
  extend(child, parent, staticProps);

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent` constructor function.
  var Surrogate = function() { this.constructor = child; };
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


/*export function bind<T extends Function>(method: T, context: any, ...args: any[]): T {
  if (typeof method !== 'function') throw new Error('method not at function')

  if (nativeBind != null) return nativeBind.call(method, context, ...args)

  args = args || []

  let fnoop = function() { }

  let fBound = function() {
    let ctx = this instanceof fnoop ? this : context
    return method.apply(ctx, args.concat(slice(arguments)))
  }

  fnoop.prototype = this.prototype
  fBound.prototype = new fnoop()

  return <any>fBound
}*/

/*export class Debug {
  static enable(enabled: boolean, namespace?: string) {
    for (let k in this.loggers) {
      if (namespace && k === namespace) {
        this.loggers[k].enabled = enabled
      } else if (!namespace) {
        this.loggers[k].enabled = enabled
      }
    }
  }
  static loggers: { [key: string]: Debug } = {}
  static formatters: { [key: string]: (args: any) => string } = {
    j: function(args: any) {
      return JSON.stringify(args);
    }
  }

  static create(namespace: string): (...args: any[]) => void {
    let logger
    if (this.loggers[namespace]) {
      logger = this.loggers[namespace]; //.debug
    } else {
      logger = new Debug(namespace);
      this.loggers[namespace] = logger
    }

    return bind(logger.debug, logger)
  }

  enabled: boolean = false

  namespace: string
  constructor(namespace: string) {
    this.namespace = namespace
  }

  debug(...args: any[]) {
    if (!this.enabled) return;


    args[0] = this._coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = Debug.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    args = this._formatArgs(args);

    this._log(...args)

  }

  private _log(...args: any[]) {
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  private _coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }

  private _formatArgs(args): any[] {
    args[0] = '[templ:' + this.namespace + '] ' + args[0]
    return args;
  }
}

export function debug(namespace: string): (...args: any[]) => void {
  return Debug.create(namespace)
}*/
