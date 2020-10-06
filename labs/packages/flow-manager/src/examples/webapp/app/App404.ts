import { Functor } from "../../../functor/Functor";
import { Undefined } from "../../../helpers/lambdas";
import { Aspect } from "../../../models";

export class App404 extends Functor {
	name = "App404";
	from = [
		{ aspect: [Aspect.GeneratedHtml, Aspect.Redirected], lambda: Undefined },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		Aspect.HttpRouted,
	];
	to = [Aspect.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 404,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
