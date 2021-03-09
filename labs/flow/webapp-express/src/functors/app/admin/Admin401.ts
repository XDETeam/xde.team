import { THttpStatusCode, HttpStatusCode } from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../AppAdminRouteAllowed";

export class Admin401 extends PrimitiveFunctor<TAppAdminRouteAllowed, THttpStatusCode> {
	name = "Admin401";
	from = [
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === false,
		},
	];
	to = [HttpStatusCode];

	distinct() {
		return {
			[HttpStatusCode]: 401,
		};
	}
}

const admin401Instance = new Admin401();
export default admin401Instance;
