import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class AppSecuredRouteRedirected extends Functor {
	name = "AppSecuredRouteRedirected";
	requires = [
		{ aspect: Aspect.HttpRouted, lambda: (route: string) => route.startsWith("/security/") },
		{ aspect: Aspect.Secured, lambda: (secured: boolean) => secured === false },
	];
	produces = [Aspect.LocationHeader, Aspect.ResponseCode];

	move(obj: { [Aspect.HttpRouted]: string }): {} {
		return {
			...obj,
			[Aspect.LocationHeader]: `https://${obj[Aspect.HttpRouted]}`,
			[Aspect.ResponseCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
