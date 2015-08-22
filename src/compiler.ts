/// <reference path="transpiler" />

module parser {
	
	export function compile (src:string, options?:any): TranspilerFunc {
		var transpiler = new Transpiler();
		var str = transpiler.transpile(src);
		console.log(str)
		return new Function("return " + str)();
	}
	
}