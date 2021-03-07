import { THtmlHtmlTagged, HtmlHtmlTagged, SentHtml, TSentHtml } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class HtmlSender extends PrimitiveFunctor<THtmlHtmlTagged, TSentHtml> {
	name = "HtmlSender";
	from = [HtmlHtmlTagged];
	to = [SentHtml];

	distinct(): TSentHtml {
		return {
			[SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
