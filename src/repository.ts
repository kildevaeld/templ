

module templ {
	export interface IRepository<T> {
		set(key:string, value:T)
		get(key:string): T
		has(key:string): boolean 
		delete(key:string) 
	}
	
	export class Repository<T> implements IRepository<T> {
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