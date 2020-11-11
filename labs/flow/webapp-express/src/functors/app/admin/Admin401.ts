import { THttpStatusCode, HttpStatusCode, HttpRouted, THttpRouted } from "@xde/aspects";
import { PrimitiveFunctor } from "@xde/flow-manager";

import { AppAdminRouteAllow, TAppAdminRouteAllowed } from "../../../models/aspects";

export class Admin401 extends PrimitiveFunctor<
	THttpRouted & TAppAdminRouteAllowed,
	THttpStatusCode
> {
	name = "Admin401";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/security/"),
		},
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
