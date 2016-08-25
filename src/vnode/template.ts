
import {IViewConstructor, VNodeOptions, Section, VNode, 
	Renderer, IView} from './vnode';
import {section} from './section';
import {View} from './view';

export interface TemplateOptions extends VNodeOptions {
		viewClass?: IViewConstructor
	}
	
	export class Template {
		section: Section
		vnode: VNode
		private _renderers: Renderer[] = []
		options: TemplateOptions
		constructor(vnode:VNode, options:TemplateOptions) {
			
			this.vnode = vnode
			
			/*let node = vnode.render(<any>options, this._renderers);
			
			this.section = section(options.document, node)*/
			this.options = options
			
		}
		
		render(context:any, options:any): Promise<IView> {
			return this.vnode.render(this.options, this._renderers)
			.then((node) => {
				this.section = section(this.options.document, node);
				
				return this.view(context, options);
			});
		}

		async view (context:any, options:any = {}): Promise<IView> {
			
			if (this.section == null) {
				throw new Error('must call render before view');
			}
			let sec = this.section.clone();
			let DestView = this.options.viewClass || View
            
            for (let k in this.options) {
                if (!options[k]) options[k] = this.options[k];
            }
			
			var view = new DestView(sec, this, context, options)
			
			/*let all = this._renderers.map( r => {
				return r.generate(sec.node||sec.start.parentNode,view);
			});
			
			return Promise.all(all)
			.then( () => {
				return view;
			});*/
			for (let i = 0, ii = this._renderers.length; i < ii; i++ ) {
				await this._renderers[i].generate(sec.node||sec.start.parentNode,view);
			}
			return view;
			
		}
	}
	
	export function template (vnode:VNode, options:TemplateOptions): Template {
		return new Template(vnode, options)
	}