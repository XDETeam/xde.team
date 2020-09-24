import { Functor } from "../../../core/Functor";
import { Aspect } from "../../../core/models";

export class Admin401 extends Functor {
	name = "Admin401";
	requires = [
		{
			aspect: Aspect.HttpRouted,
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

const admin401Instance = new Admin401();
export default admin401Instance;
