import { Aspects } from "../../../aspects";
import { ITestHttpRequest } from "../../../models";
import { IFunctor } from "../../Functor";

export class Secured implements IFunctor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.Secured];

	move(obj: { [Aspects.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspects.Secured]: obj[Aspects.HttpRequest].isTLS,
		};
	}
}

const securedInstance = new Secured();
export default securedInstance;
