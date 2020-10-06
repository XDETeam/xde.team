import { Functor } from "../../../functor/Functor";
import { PartialObject } from "../../../helpers/lambdas";
import { Aspect } from "../../../models";

export class AppAdminRouteAllowed extends Functor {
	name = "AppAdminRouteAllowed";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: string }>) =>
				!!obj[Aspect.HttpRouted]?.startsWith("/security/"),
		},
		{
			aspect: Aspect.Secured,
			lambda: (obj: PartialObject<Aspect.Secured, { [Aspect.Secured]?: boolean }>) =>
				obj[Aspect.Secured] === true,
		},
	];
	to = [Aspect.AppAdminRouteAllowed];

	move(obj: {}): {} {
		Functor.debugger.extend("AppAdminRouteAllowed")("Set AdminFlag to any to pass");
		return {
			...obj,
			[Aspect.AppAdminRouteAllowed]: "AdminFlag" in obj,
		};
	}
}

const appAdminRouteAllowedInstance = new AppAdminRouteAllowed();
export default appAdminRouteAllowedInstance;
