import { TGeneratedHtml, GeneratedHtml, SentHtml, TSentHtml } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class HtmlSender extends PrimitiveFunctor<TGeneratedHtml, TSentHtml> {
	name = "HtmlSender";
	from = [GeneratedHtml];
	to = [SentHtml];

	distinct(): TSentHtml {
		return {
			[SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
