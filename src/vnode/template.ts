
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
			
			let node = vnode.render(<any>options, this._renderers);
			
			this.section = section(options.document, node)
			this.options = options
			
		}
		
		view (context:any, options): IView {
			
			let sec = this.section.clone();
			let DestView = this.options.viewClass || View
			
			var view = new DestView(sec,this,context,options)
			
			for (let renderer of this._renderers) {
				renderer.generate(sec.node||sec.start.parentNode,view)
			}
		
			return view
		}
	}
	
	export function template (vnode:VNode, options:TemplateOptions): Template {
		return new Template(vnode, options)
	}