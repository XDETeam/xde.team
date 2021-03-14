import { THttpRoute, THttpSecured, HttpSecured, HttpRoute } from "@xde.labs/aspects";

import { Functor } from "../../../functor/Functor";
import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../models/";

export class AppAdminRouteAllowed extends PrimitiveFunctor<
	THttpRoute & THttpSecured,
	TAppAdminRouteAllowed
> {
	name = "AppAdminRouteAllowed";
	from = [
		{
			aspect: HttpRoute,
			lambda: (obj: THttpRoute) => !!obj[HttpRoute]?.path.startsWith("/security/"),
		},
		{
			aspect: HttpSecured,
			lambda: (obj: THttpSecured) => obj[HttpSecured] === true,
		},
	];
	to = [AppAdminRouteAllow];

	distinct(obj: THttpRoute & THttpSecured): TAppAdminRouteAllowed {
		Functor.debugger.extend("AppAdminRouteAllowed")("Set AdminFlag to any to pass");
		return {
			[AppAdminRouteAllow]: "AdminFlag" in obj,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
