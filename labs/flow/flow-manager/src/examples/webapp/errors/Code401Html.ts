import { THttpStatusCode, HttpStatusCode, HtmlTagHtml, THtmlTagHtml } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code401Html extends PrimitiveFunctor<THttpStatusCode<401>, THtmlTagHtml> {
	name = "Code401Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<401>) => obj[HttpStatusCode] === 401,
		},
	];
	to = [HtmlTagHtml];

	distinct(): THtmlTagHtml {
		return {
			[HtmlTagHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
