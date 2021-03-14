import { THtmlTagHtml, HtmlTagHtml, Sent, TSent } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";

export class HtmlSender extends PrimitiveFunctor<THtmlTagHtml, TSent> {
	name = "HtmlSender";
	from = [HtmlTagHtml];
	to = [Sent];

	distinct() {
		return {
			[Sent]: true as const,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
