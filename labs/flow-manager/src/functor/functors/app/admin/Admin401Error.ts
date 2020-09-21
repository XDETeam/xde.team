import { Functor } from "../../../Functor";
import { Aspects } from "../../../../aspects/index";

export class Admin401Error extends Functor {
	requires = [
		{
			aspect: Aspects.Routed,
			lambda: (asp: string) => asp.startsWith("/security/"),
		},
		{
			aspect: Aspects.AppAdminRouteAllowed,
			lambda: (asp: boolean) => asp === false,
		},
	];
	produces = [Aspects.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.ResponseCode]: 401,
		};
	}
}

const admin401ErrorInstance = new Admin401Error();
export default admin401ErrorInstance;
