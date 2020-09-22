import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class App404 extends Functor {
	name = "App404";
	requires = [
		{ undef: Aspect.GeneratedHtml },
		{ undef: Aspect.Redirected },
		// Two below - to ensure we are not adding 404 handling for something that doesn't need it.
		Aspect.HttpRouted,
		Aspect.HttpRequest,
	];
	produces = [Aspect.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 404,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
