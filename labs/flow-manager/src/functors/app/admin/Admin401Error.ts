import { Functor } from "../../../core/Functor";
import { Aspect } from "../../../core/models";

export class Admin401Error extends Functor {
	requires = [
		{
			aspect: Aspect.Routed,
			lambda: (asp: string) => asp.startsWith("/security/"),
		},
		{
			aspect: Aspect.AppAdminRouteAllowed,
			lambda: (asp: boolean) => asp === false,
		},
	];
	produces = [Aspect.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 401,
		};
	}
}

const admin401ErrorInstance = new Admin401Error();
export default admin401ErrorInstance;
