import { Functor, Some } from "@xde/flow-manager";
import { Response } from "express";

import { Aspect } from "../../models/aspects";

export class HttpEnded extends Functor<Aspect> {
	name = "HttpEnded";
	from = [
		{ aspect: [Aspect.SentHtml, Aspect.SentApiResponse], lambda: Some },
		Aspect.HttpResponse,
	];
	to = [Aspect.Ended];

	map(obj: { [Aspect.HttpResponse]: Response }) {
		obj[Aspect.HttpResponse].end();

		return {
			...obj,
			[Aspect.Ended]: true,
		};
	}
}

const httpEndedInstance = new HttpEnded();
export default httpEndedInstance;
