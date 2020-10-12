import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";
import { EndpointType } from "../http/HttpEndpointTyped";

export class Code404Html extends Functor<Aspect> {
	name = "Code404Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 404,
		},
		{
			aspect: Aspect.EndpointType,
			lambda: (
				obj: PartialObject<Aspect.EndpointType, { [Aspect.EndpointType]?: EndpointType }>
			) => obj[Aspect.EndpointType] === EndpointType.Html,
		},
	];
	to = [Aspect.GeneratedHtml];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const code404HtmlInstance = new Code404Html();
export default code404HtmlInstance;
