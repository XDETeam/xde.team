import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
import {
	THttpStatusCode,
	HttpStatusCode,
	NodejsExpressResponse,
	TNodejsExpressResponse,
	TSentHtml,
	SentHtml,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
	EndpointType,
	Endpoint,
	TEndpointType,
	THttpHeaders,
	HttpHeaders,
} from "@xde.labs/aspects";

type THtmlSenderFrom = TNodejsExpressResponse &
	THtmlHtmlTagged &
	THttpStatusCode &
	TEndpointType &
	Partial<THttpHeaders>;

export class HtmlSender extends PrimitiveFunctor<THtmlSenderFrom, TSentHtml> {
	name = "HtmlSender";
	from = [
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
		NodejsExpressResponse,
		HtmlHtmlTagged,
		HttpStatusCode,
		{ aspect: HttpHeaders, lambda: Optional },
	];
	to = [SentHtml];

	distinct(obj: THtmlSenderFrom) {
		obj[NodejsExpressResponse].status(obj[HttpStatusCode]);

		if (obj[HttpHeaders]) {
			obj[NodejsExpressResponse].header(obj[HttpHeaders]);
		}

		obj[NodejsExpressResponse].send(obj[HtmlHtmlTagged]);

		return {
			[SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
