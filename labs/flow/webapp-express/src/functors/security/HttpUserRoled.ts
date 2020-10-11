import { Functor } from "@xde/flow-manager";
import { Request } from "express";

import { Aspect } from "../../models/aspects";

export enum UserRole {
	Visitor,
	Regular,
	Admin,
}

export const UserRoledCookie = "auth";

export class HttpUserRoled extends Functor<Aspect> {
	name = "HttpUserRoled";
	from = [Aspect.HttpRequest];
	to = [Aspect.UserRoled];

	map(obj: { [Aspect.HttpRequest]: Request }): {} {
		Functor.debugger.extend("HttpHasAuth")(`Set ${UserRoledCookie} to be one of UserRole`);

		return {
			...obj,
			[Aspect.UserRoled]:
				obj[Aspect.HttpRequest].cookies?.[UserRoledCookie] ?? UserRole.Visitor,
		};
	}
}

const httpUserRoledInstance = new HttpUserRoled();
export default httpUserRoledInstance;
