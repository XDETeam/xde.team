import { Functor } from "../../Functor";
import { Aspects } from "../../../aspects/index";
import { ITestHttpRequest } from "../../../models";

export class Routed extends Functor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.Routed];

	move(obj: { [Aspects.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspects.Routed]: obj[Aspects.HttpRequest].route,
		};
	}
}

const routedInstance = new Routed();
export default routedInstance;
