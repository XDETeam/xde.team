import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class Error404 extends Functor {
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

const error404Instance = new Error404();
export default error404Instance;
