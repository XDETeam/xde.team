import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class HttpRedirect extends Functor {
	requires = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (asp: number) => asp === 301,
		},
		Aspect.LocationHeader,
	];
	produces = [Aspect.Redirected];

	move(obj: { [Aspect.LocationHeader]: string }): {} {
		Functor.debugger.extend("HttpRedirect")(`Redirected to ${obj[Aspect.LocationHeader]}`);
		return {
			...obj,
			[Aspect.Redirected]: true,
		};
	}
}

const httpRedirectInstance = new HttpRedirect();
export default httpRedirectInstance;
