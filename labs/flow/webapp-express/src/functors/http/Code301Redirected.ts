import { Functor, PartialObject } from "@xde/flow-manager";
import { Response } from "express";

import { Aspect } from "../../models/aspects";

export class Code301Redirected extends Functor<Aspect> {
	name = "Code301Redirected";
	from = [
		Aspect.HttpResponse,
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 301,
		},
		Aspect.LocationHeader,
	];
	to = [Aspect.Redirected];

	map(obj: {
		[Aspect.HttpResponse]: Response;
		[Aspect.LocationHeader]: string;
		[Aspect.ResponseCode]: 301;
	}): {} {
		Functor.debugger.extend("Code301Redirected")(`Redirected to ${obj[Aspect.LocationHeader]}`);
		obj[Aspect.HttpResponse].redirect(obj[Aspect.ResponseCode], obj[Aspect.LocationHeader]);
		return {
			...obj,
			[Aspect.Redirected]: true,
		};
	}
}

const code301RedirectedInstance = new Code301Redirected();
export default code301RedirectedInstance;
