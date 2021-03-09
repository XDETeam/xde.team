import {
	TVisitorRoled,
	VisitorRole,
	VisitorRoled,
	THttpSecured,
	HttpSecured,
} from "@xde.labs/aspects";
import { Functor, PrimitiveFunctor } from "@xde.labs/flow-manager";
import { VisitorRoledCookie } from "../security/HttpVisitorRoled";
import { TAppAdminRoute, AppAdminRoute } from "./AppAdminRouted";

/**
 * Creating aspect for this functor
 */
export const AppAdminRouteAllow = "AppAdminRouteAllow" as const;
export type TAppAdminRouteAllowed = {
	[AppAdminRouteAllow]: boolean;
};
export class AppAdminRouteAllowed extends PrimitiveFunctor<
	TAppAdminRoute & TVisitorRoled & THttpSecured,
	TAppAdminRouteAllowed
> {
	name = "AppAdminRouteAllowed";
	from = [
		VisitorRoled,
		AppAdminRoute,
		{
			aspect: HttpSecured,
			lambda: (obj: THttpSecured) => obj[HttpSecured] === true,
		},
	];
	to = [AppAdminRouteAllow];

	distinct(obj: TVisitorRoled) {
		Functor.debugger.extend("AppAdminRouteAllowed")(
			`Set ${VisitorRoledCookie} cookie to ${VisitorRole.Admin} to be an admin`
		);
		return {
			[AppAdminRouteAllow]: obj[VisitorRoled] == VisitorRole.Admin,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
