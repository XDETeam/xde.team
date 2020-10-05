import { Functor } from "../../core/Functor";
import { PartialObject } from "../../core/helpers/lambdas";
import { Aspect } from "../../core/models";

export class Code401Html extends Functor {
	name = "Code401Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 401,
		},
	];
	to = [Aspect.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
