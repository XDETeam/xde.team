import {
	THttpStatusCode,
	HttpStatusCode,
	HtmlHtmlTagged,
	THtmlHtmlTagged,
} from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class Code401Html extends PrimitiveFunctor<THttpStatusCode<401>, THtmlHtmlTagged> {
	name = "Code401Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<401>) => obj[HttpStatusCode] === 401,
		},
	];
	to = [HtmlHtmlTagged];

	distinct(): THtmlHtmlTagged {
		return {
			[HtmlHtmlTagged]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
