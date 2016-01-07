import {BaseComponent} from './component';
import {VNode} from '../vnode';
import {Call} from '../view'
function _each(target, iterate) {

    if (!target) return;

    if (target.forEach) {
      // use API here since target could be an object
      target.forEach(iterate);
    } else {
      for (var key in target) {
        if (target.hasOwnProperty(key)) iterate(target[key], key);
      }
    }
  }

  export class Repeat extends BaseComponent {
    _children: VNode[] = []

    update() {
      
      var as = this['as'];
      var each = this['each'];
      var key = this['key'] || "key";

      var n = 0;
      var self = this;
      var parent = this.view;

      var properties;
    
      if (each instanceof Call) {
        each = each.call();
      }
      
      _each(each, function(model, k) {

        var child;
        
        if (as) {
          properties = {};
          properties[key] = k;
          properties[as] = model;
        } else {
          properties = model;
        }
        properties.parent = self.view.context;
        // TODO - provide SAME context here for speed and stability
        if (n >= self._children.length) {
          
          child = self.childTemplate.view(properties, {
            parent: parent
          });
          
          self._children.push(child);
          
          self.section.appendChild(child.render(properties));
          
        } else {
          child = self._children[n];
          child.context = properties;
          child.update();
        }

        n++;
      });
      
      this._children.splice(n).forEach(function(child) {
      
        (<any>child).remove();
      });
     
    }
    
    setAttribute (key:string,value:any) {
      
      this[key] = value
    }

  }
  
  export var repeat = Repeat;