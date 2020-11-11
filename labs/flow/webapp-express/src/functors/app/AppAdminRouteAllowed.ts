import {
	TVisitorRoled,
	VisitorRole,
	VisitorRoled,
	THttpRouted,
	HttpRouted,
	THttpSecured,
	HttpSecured,
} from "@xde/aspects";
import { Functor, PrimitiveFunctor } from "@xde/flow-manager";
import { AppAdminRouteAllow, TAppAdminRouteAllowed } from "../../models/aspects";
import { VisitorRoledCookie } from "../security/HttpVisitorRoled";

export class AppAdminRouteAllowed extends PrimitiveFunctor<
	TVisitorRoled & THttpRouted & THttpSecured,
	TAppAdminRouteAllowed
> {
	name = "AppAdminRouteAllowed";
	from = [
		VisitorRoled,
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
