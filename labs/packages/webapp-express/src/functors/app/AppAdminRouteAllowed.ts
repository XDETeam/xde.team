import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../models/aspects";
import { IHttpRouted } from "../http/HttpRouted";
import { UserRole, UserRoledCookie } from "../security/HttpUserRoled";

export class AppAdminRouteAllowed extends Functor<Aspect> {
	name = "AppAdminRouteAllowed";
	from = [
		Aspect.UserRoled,
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.startsWith("/security/"),
		},
		{
			aspect: Aspect.Secured,
			lambda: (obj: PartialObject<Aspect.Secured, { [Aspect.Secured]?: boolean }>) =>
				obj[Aspect.Secured] === true,
		},
	];
	to = [Aspect.AppAdminRouteAllowed];

	map(obj: { [Aspect.UserRoled]: UserRole }): {} {
		Functor.debugger.extend("AppAdminRouteAllowed")(
			`Set ${UserRoledCookie} cookie to ${UserRole.Admin} to be an admin`
		);
		return {
			...obj,
			[Aspect.AppAdminRouteAllowed]: obj[Aspect.UserRoled] == UserRole.Admin,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
