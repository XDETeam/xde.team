import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";
import { EndpointType } from "../http/HttpEndpointTyped";

export class Code401Html extends Functor<Aspect> {
	name = "Code401Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 401,
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
			[Aspect.GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const code401HtmlInstance = new Code401Html();
export default code401HtmlInstance;
