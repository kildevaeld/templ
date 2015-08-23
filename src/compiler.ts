/// <reference path="transpiler" />

module parser {
	
	export function compile (src:string, options?:any): TranspilerFunc {
		var str = transpile(src);
		return new Function("return " + str)();
	}
	
}