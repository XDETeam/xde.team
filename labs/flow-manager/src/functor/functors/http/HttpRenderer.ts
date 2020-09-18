import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class HttpRenderer implements IFunctor {
	requires = [Aspects.GeneratedHtml];
	produces = [Aspects.RenderedHtml];

	move(obj: {}): {} {
		console.log("-- rendered html response");
		// console.log("Also sets status code in case exists?");

		return {
			...obj,
			[Aspects.RenderedHtml]: true,
		};
	}
}

const httpRendererInstance = new HttpRenderer();
export default httpRendererInstance;
