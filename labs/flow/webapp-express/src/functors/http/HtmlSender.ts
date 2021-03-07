import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import {
	THttpStatusCode,
	HttpStatusCode,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	TSentHtml,
	SentHtml,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
} from "@xde.labs/aspects";

export class HtmlSender extends PrimitiveFunctor<
	TNodejsExpressResponse & THtmlHtmlTagged & THttpStatusCode,
	TSentHtml
> {
	name = "HtmlSender";
	from = [NodejsExpressResponse, HtmlHtmlTagged, HttpStatusCode];
	to = [SentHtml];

	distinct(obj: TNodejsExpressResponse & THtmlHtmlTagged & THttpStatusCode) {
		obj[NodejsExpressResponse].status(obj[HttpStatusCode]).send(obj[HtmlHtmlTagged]);

		return {
			[SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
