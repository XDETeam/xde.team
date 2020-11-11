import { PrimitiveFunctor } from "@xde/flow-manager";
import {
	THttpStatusCode,
	HttpStatusCode,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	TSentHtml,
	SentHtml,
	TGeneratedHtml,
	GeneratedHtml,
} from "@xde/aspects";

export class HtmlSender extends PrimitiveFunctor<
	TNodejsExpressResponse & TGeneratedHtml & THttpStatusCode,
	TSentHtml
> {
	name = "HtmlSender";
	from = [NodejsExpressResponse, GeneratedHtml, HttpStatusCode];
	to = [SentHtml];

	distinct(obj: TNodejsExpressResponse & TGeneratedHtml & THttpStatusCode) {
		obj[NodejsExpressResponse].status(obj[HttpStatusCode]).send(obj[GeneratedHtml]);

		return {
			[SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
