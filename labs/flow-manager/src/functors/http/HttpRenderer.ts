import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class HttpRenderer extends Functor {
	requires = [Aspect.GeneratedHtml];
	produces = [Aspect.RenderedHtml];

	move(obj: {}): {} {
		// console.log("Also sets status code in case exists?");

		return {
			...obj,
			[Aspect.RenderedHtml]: true,
		};
	}
}

const httpRendererInstance = new HttpRenderer();
export default httpRendererInstance;
