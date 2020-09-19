import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";
import { appDebug } from "../../../helpers/debug";

const debug = appDebug.extend("HttpRedirect");

export class HttpRedirect implements IFunctor {
	requires = [
		{
			aspect: Aspects.ResponseCode,
			lambda: (asp: number) => asp === 301,
		},
		Aspects.LocationHeader,
	];
	produces = [Aspects.Redirected];

	move(obj: { [Aspects.LocationHeader]: string }): {} {
		debug(`Redirected to ${obj[Aspects.LocationHeader]}`);
		return {
			...obj,
			[Aspects.Redirected]: true,
		};
	}
}

const httpRedirectInstance = new HttpRedirect();
export default httpRedirectInstance;
