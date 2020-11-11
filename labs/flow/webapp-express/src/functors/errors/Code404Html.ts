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

export class Code404Html extends PrimitiveFunctor<
	THttpStatusCode<404> & TEndpointType,
	TGeneratedHtml
> {
	name = "Code404Html";
	from = [
		{
			aspect: HttpStatusCode,
			lambda: (obj: THttpStatusCode<404>) => obj[HttpStatusCode] === 404,
		},
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
	];
	to = [GeneratedHtml];

	distinct() {
		return {
			[GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
