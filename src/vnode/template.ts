/// <reference path="vnode" />
/// <reference path="section" />
/// <reference path="view" />



module vnode {

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
			
			let section = this.section.clone();
			let DestView = this.options.viewClass || View
			
			let view = new DestView(section,this,context,options)
			
			for (let renderer of this._renderers) {
				renderer.generate(section.node||section.start.parentNode,view)
			}
		
			return view
		}
	}
	
	export function template (vnode:VNode, options:TemplateOptions): Template {
		return new Template(vnode, options)
	}
}