import {
	THttpStatusCode,
	HttpStatusCode,
	TEndpointType,
	EndpointType,
	Endpoint,
	TGeneratedHtml,
	GeneratedHtml,
} from "@xde/aspects";
import { PrimitiveFunctor } from "@xde/flow-manager";

export class Code401Html extends PrimitiveFunctor<
	THttpStatusCode<401> & TEndpointType,
	TGeneratedHtml
> {
	name = "Code401Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<401>) => obj[HttpStatusCode] === 401,
		},
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
	];
	to = [GeneratedHtml];

	distinct() {
		return {
			[GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
