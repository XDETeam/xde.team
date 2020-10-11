import { Functor } from "../../../functor/Functor";
import { PartialObject } from "../../../helpers/lambdas";
import { Aspect } from "../../../models";

export class Code401Html extends Functor {
	name = "Code401Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (
				obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>
			) => obj[Aspect.ResponseCode] === 401,
		},
	];
	to = [Aspect.GeneratedHtml];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
