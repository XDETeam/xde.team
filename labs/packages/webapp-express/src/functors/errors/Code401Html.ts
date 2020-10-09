import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";

export class Code401Html extends Functor<Aspect> {
	name = "Code401Html";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 401,
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
