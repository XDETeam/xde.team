import { Functor, Undefined } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";

export class App404 extends Functor<Aspect> {
	name = "App404";
	from = [
		{ aspect: [Aspect.GeneratedHtml, Aspect.Redirected], lambda: Undefined },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		Aspect.HttpRouted,
	];
	to = [Aspect.ResponseCode];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 404,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
