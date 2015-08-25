

module modifiers {
	export function uppercase(value) {
    return String(value).toUpperCase();
  }
  export function lowercase(value) {
    return String(value).toLowerCase();
  }
  export function titlecase (value) {
    var str;
    str = String(value);
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
	
  export function json (value, count, delimiter) {
    return JSON.stringify.apply(JSON, arguments);
  }
	
  export function isNaN (value) {
    return isNaN(value);
  }
  export const round = Math.round
}