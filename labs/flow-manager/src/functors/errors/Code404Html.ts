import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class Code404Html extends Functor {
	name = "Code404Html";
	requires = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (asp: number) => !!asp && asp === 404,
		},
	];
	produces = [Aspect.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
