import { THttpStatusCode, HttpStatusCode, GeneratedHtml, TGeneratedHtml } from "@xde/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code401Html extends PrimitiveFunctor<THttpStatusCode, TGeneratedHtml> {
	name = "Code401Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode) => obj[HttpStatusCode] === 401,
		},
	];
	to = [GeneratedHtml];

	distinct(): TGeneratedHtml {
		return {
			[GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
