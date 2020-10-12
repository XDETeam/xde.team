import { Functor, Optional } from "@xde/flow-manager";
import { Response } from "express";

import { Aspect } from "../../models/aspects";

export class HtmlSender extends Functor<Aspect> {
	name = "HtmlSender";
	from = [
		Aspect.HttpResponse,
		Aspect.GeneratedHtml,
		{ aspect: Aspect.ResponseCode, lambda: Optional },
	];
	to = [Aspect.SentHtml];

	map(obj: {
		[Aspect.HttpResponse]: Response;
		[Aspect.GeneratedHtml]: string;
		[Aspect.ResponseCode]: number;
	}) {
		obj[Aspect.HttpResponse]
			.status(obj[Aspect.ResponseCode])
			.send(obj[Aspect.GeneratedHtml]);

		return {
			...obj,
			[Aspect.SentHtml]: true,
		};
	}
}

const htmlSenderInstance = new HtmlSender();
export default htmlSenderInstance;
