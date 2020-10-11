import { Functor } from "@xde/flow-manager";
import { Response } from "express";

import { Aspect } from "../../models/aspects";

export class HttpEnded extends Functor<Aspect> {
	name = "HttpEnded";
	from = [Aspect.SentHtml, Aspect.HttpResponse];
	to = [Aspect.Ended];

	map(obj: { [Aspect.HttpResponse]: Response; [Aspect.SentHtml]: boolean }) {
		obj[Aspect.HttpResponse].end();

		return {
			...obj,
			[Aspect.Ended]: true,
		};
	}
}

const httpEndedInstance = new HttpEnded();
export default httpEndedInstance;
