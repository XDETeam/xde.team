import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../../models/aspects";
import { IHttpRouted } from "../../http/HttpRouted";

export class Admin401 extends Functor<Aspect> {
	name = "Admin401";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/security/"),
		},
		{
			aspect: Aspect.AppAdminRouteAllowed,
			lambda: (
				obj: PartialObject<
					Aspect.AppAdminRouteAllowed,
					{ [Aspect.AppAdminRouteAllowed]?: boolean }
				>
			) => obj[Aspect.AppAdminRouteAllowed] === false,
		},
	];
	to = [Aspect.ResponseCode];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 401,
		};
	}
}

const admin401Instance = new Admin401();
export default admin401Instance;
