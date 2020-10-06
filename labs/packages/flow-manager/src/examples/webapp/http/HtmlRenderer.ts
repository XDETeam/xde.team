import { Functor } from "../../../functor/Functor";
import { Aspect } from "../../../models";

export class HtmlRenderer extends Functor {
	name = "HtmlRenderer";
	from = [Aspect.GeneratedHtml];
	to = [Aspect.RenderedHtml];

	move(obj: {}): {} {
		// console.log("Also sets status code in case exists?");

		return {
			...obj,
			[Aspect.RenderedHtml]: true,
		};
	}
}

const htmlRendererInstance = new HtmlRenderer();
export default htmlRendererInstance;
