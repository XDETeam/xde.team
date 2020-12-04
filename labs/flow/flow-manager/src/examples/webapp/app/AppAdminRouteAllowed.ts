import { THttpRouted, THttpSecured, HttpSecured, HttpRouted } from "@xde.labs/aspects";

import { Functor } from "../../../functor/Functor";
import { PrimitiveFunctor } from "../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../models/";

export class AppAdminRouteAllowed extends PrimitiveFunctor<
	THttpRouted & THttpSecured,
	TAppAdminRouteAllowed
> {
	name = "AppAdminRouteAllowed";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/security/"),
		},
		{
			aspect: HttpSecured,
			lambda: (obj: THttpSecured) => obj[HttpSecured] === true,
		},
	];
	to = [AppAdminRouteAllow];

	distinct(obj: THttpRouted & THttpSecured): TAppAdminRouteAllowed {
		Functor.debugger.extend("AppAdminRouteAllowed")("Set AdminFlag to any to pass");
		return {
			[AppAdminRouteAllow]: "AdminFlag" in obj,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
