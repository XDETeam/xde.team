import { THttpStatusCode, HttpStatusCode, GeneratedHtml, TGeneratedHtml } from "@xde/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code404Html extends PrimitiveFunctor<THttpStatusCode, TGeneratedHtml> {
	name = "Code404Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode) => obj[HttpStatusCode] === 404,
		},
	];
	to = [GeneratedHtml];

	distinct(): TGeneratedHtml {
		return {
			[GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
