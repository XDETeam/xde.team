import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class Error401 extends Functor {
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

const error401Instance = new Error401();
export default error401Instance;
