import { THttpRoute, THttpStatusCode, HttpStatusCode, HttpRoute } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../../models/";

export class Admin401 extends PrimitiveFunctor<
	THttpRoute & TAppAdminRouteAllowed,
	THttpStatusCode<401>
> {
	name = "Admin401";
	from = [
		{
			aspect: HttpRoute,
			lambda: (obj: THttpRoute) => !!obj[HttpRoute]?.path.startsWith("/security/"),
		},
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === false,
		},
	];
	to = [HttpStatusCode];

	distinct(): THttpStatusCode<401> {
		return {
			[HttpStatusCode]: 401,
		};
	}
}

const admin401Instance = new Admin401();
export default admin401Instance;
