import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class Code401Html extends Functor {
	name = "Code401Html"
	requires = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (asp: number) => asp === 401,
		},
	];
	produces = [Aspect.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
