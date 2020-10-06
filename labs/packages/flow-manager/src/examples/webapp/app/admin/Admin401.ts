import { Functor } from "../../../../functor/Functor";
import { PartialObject } from "../../../../helpers/lambdas";
import { Aspect } from "../../../../models";

export class Admin401 extends Functor {
	name = "Admin401";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: string }>) =>
				!!obj[Aspect.HttpRouted]?.startsWith("/security/"),
		},
		{
			aspect: Aspect.AppAdminRouteAllowed,
			lambda: (
				obj: PartialObject<
					Aspect.AppAdminRouteAllowed,
					{ [Aspect.AppAdminRouteAllowed]?: boolean }
				>
			) => obj[Aspect.AppAdminRouteAllowed] === false,
		},
	];
	to = [Aspect.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.ResponseCode]: 401,
		};
	}
}

const admin401Instance = new Admin401();
export default admin401Instance;
