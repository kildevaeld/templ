

module templ {
	export class Repository<T> {
		values: {[key:string]: T }
		constructor(values?:{[key:string]: T}) {
			this.values = values || {};
		}
		
		set(key:string, value:T) {
			this.values[key] = value;
		}
		
		get(key:string): T {
			return this.values[key];
		}
		
		has(key:string): boolean {
			return !!this.get(key);
		}
		
		delete(key:string) {
			delete this.values[key];
		}
		
	}
}