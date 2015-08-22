/// <reference path="vnode/view" />
/// <reference path="vnode/vnode" />

function _set(target, keypath, value) {

  var keys = typeof keypath === "string" ? keypath.split(".") : keypath;
  var ct   = target;
  var key;

  for (var i = 0, n = keys.length - 1; i < n; i++) {
    key = keys[i];
    if (!ct[key]) {
      ct[key] = {};
    }
    ct = ct[key];
  }

  ct[keys[keys.length - 1]] = value;
  return value;
}


module templ {
	export class Reference {
	gettable:boolean
	settable:boolean
	view:templ.View
	path:string
	
	value (value?:any): any {
		if (arguments.length === 0) {
			return this.gettable ? this.view.get(this.path) : void 0;	
		}
		if (this.settable) this.view.set(this.path, value)
	}
	
	
	constructor (view:templ.View, path:string, gettable:boolean,settable:boolean) {
		this.gettable = gettable
		this.settable = settable
		this.view = view
		this.path = path
	}
	
	
	
	toString (): string {
		return this.view.get(this.path)
	}
}
	
	export class View extends vnode.View {
		
	
		
		get (key): any {
			return this.context[key]	
		}
		
		set (path:string|string[], value:any) {
			if (!this.context) return void 0;
    	if (typeof path === "string") path = (<any>path).split(".");
    	var ret = _set(this.context, path, value);
			this.update()
		}
		
		ref (path:string, gettable:boolean,settable:boolean): Reference {
			return new Reference(this,path,gettable,settable)
		}
		
		call () {
			
		}
		
	}
	
}



