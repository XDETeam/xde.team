import {
	TGeneratedHtml,
	GeneratedHtml,
	THttpRedirected,
	HttpRedirected,
	THttpRouted,
	HttpRouted,
	THttpStatusCode,
	HttpStatusCode,
} from "@xde.labs/aspects";
import { TUndefined } from "@xde.labs/common";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { Undefined } from "../../../helpers/lambdas";

export class App404 extends PrimitiveFunctor<
	TUndefined<TGeneratedHtml> & TUndefined<THttpRedirected> & THttpRouted,
	THttpStatusCode<404>
> {
	name = "App404";
	from = [
		{ aspect: [GeneratedHtml, HttpRedirected], lambda: Undefined },
		// To ensure we are not adding 404 handling for something that doesn't need it.
		HttpRouted,
	];
	to = [HttpStatusCode];

	distinct() {
		return {
			[HttpStatusCode]: 404 as const,
		};
	}
}

const app404Instance = new App404();
export default app404Instance;
