import { Aspects } from "../../../aspects";
import { ITestHttpRequest } from "../../../models";
import { Functor } from "../../Functor";

export class Secured extends Functor {
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
