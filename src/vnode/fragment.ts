
import {VNode, NodeType, VNodeOptions, Renderer} from './vnode';
import {FragmentCreator} from '../transpiler';

/*function iterateSync(list:any[], fn:(child:any) => Promise<any>): Promise<any[]> {
  return new Promise((resolve, reject) => {
    var current = 0, length = list.length;
    var out = [];
    const next = (err, value) => {
      if (current == length - 1) {
        return resolve(out);
      } else if (err != null) {
        return reject(err)
      } else if (err == null && value == null) {

      }
    };

    next(null, null);
  });
}*/

export class Fragment implements VNode {
    nodeType = NodeType.Fragment
    childNodes: VNode[]
    constructor(children: VNode[]) {

      this.childNodes = children;

      for (var i = 0; i < children.length; i++) children[i].parentNode = this;

    }

    async render(options: VNodeOptions, renderers:Renderer[]): Promise<DocumentFragment> {

      let fragment = options.document.createDocumentFragment()
      
      /*let r = this.childNodes.map( c => {
        return c.render(options, renderers);
      });

      return Promise.all(r)
      .then( childs => {
        childs.forEach( m => fragment.appendChild(<any>m));
        return fragment;
      });*/

      for (var i = 0, n = this.childNodes.length; i < n; i++) {
        let child = await this.childNodes[i].render(options, renderers);
        fragment.appendChild(child);
        //fragment.appendChild(this.childNodes[i].render(options, renderers));
      }
      return fragment;
      /*for (var i = 0, n = this.childNodes.length; i < n; i++) {
        fragment.appendChild(this.childNodes[i].render(options, renderers));
      }*/

      //return fragment;

    }

  }
  
  
  export const fragment: FragmentCreator = function (children: VNode[]): Fragment {
    return new Fragment(children);
  }


