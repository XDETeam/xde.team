import {
	THttpStatusCode,
	HttpStatusCode,
	THttpHeaders,
	HttpHeaders,
	THttpRedirected,
	HttpRedirected,
} from "@xde/aspects";

import { Functor } from "../../../functor/Functor";
import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code301Redirected extends PrimitiveFunctor<
	THttpStatusCode & THttpHeaders,
	THttpRedirected
> {
	name = "Code301Redirected";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode) => obj[HttpStatusCode] === 301,
		},
		{
			aspect: HttpHeaders,
			lambda: (obj: THttpHeaders) => "Location" in obj[HttpHeaders],
		},
	];
	to = [HttpRedirected];

	distinct(obj: THttpHeaders): THttpRedirected {
		Functor.debugger.extend("Code301Redirected")(`Redirected to ${obj[HttpHeaders].Location}`);
		return {
			[HttpRedirected]: true,
		};
	}
}

const code301RedirectedInstance = new Code301Redirected();
export default code301RedirectedInstance;
