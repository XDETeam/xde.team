import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class AppSecuredRouteRedirected extends Functor {
	requires = [
		{ aspect: Aspect.Routed, lambda: (route: string) => route.startsWith("/security/") },
		{ aspect: Aspect.Secured, lambda: (secured: boolean) => secured === false },
	];
	produces = [Aspect.LocationHeader, Aspect.ResponseCode];

	move(obj: { [Aspect.Routed]: string }): {} {
		return {
			...obj,
			[Aspect.LocationHeader]: `https://${obj[Aspect.Routed]}`,
			[Aspect.ResponseCode]: 301,
		};
	}
}

const appSecuredRouteRedirectedInstance = new AppSecuredRouteRedirected();
export default appSecuredRouteRedirectedInstance;
