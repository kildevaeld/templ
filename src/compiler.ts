/// <reference path="transpiler" />

module templ.compiler {
	
	export function compile (src:string, options?:any): TranspilerFunc {
		var str = transpile(src);
		return new Function("return " + str)();
	}
	
}