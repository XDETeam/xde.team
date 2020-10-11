import { Functor } from "../../../functor/Functor";
import { PartialObject } from "../../../helpers/lambdas";
import { Aspect } from "../../../models";

export class Code404Html extends Functor {
	name = "Code404Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (
				obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>
			) => obj[Aspect.ResponseCode] === 404,
		},
	];
	to = [Aspect.GeneratedHtml];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
