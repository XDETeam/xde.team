import { Functor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class HttpRedirect extends Functor {
	requires = [
		{
			aspect: Aspects.ResponseCode,
			lambda: (asp: number) => asp === 301,
		},
		Aspects.LocationHeader,
	];
	produces = [Aspects.Redirected];

	move(obj: { [Aspects.LocationHeader]: string }): {} {
		Functor.debugger.extend("HttpRedirect")(`Redirected to ${obj[Aspects.LocationHeader]}`);
		return {
			...obj,
			[Aspects.Redirected]: true,
		};
	}
}

const httpRedirectInstance = new HttpRedirect();
export default httpRedirectInstance;
