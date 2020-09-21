import { Functor } from "../../Functor";
import { Aspects } from "../../../aspects/index";
import { ITestHttpRequest } from "../../../models";

export class HasAuth extends Functor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.HasAuth];

	move(obj: { [Aspects.HttpRequest]: ITestHttpRequest }): {} {
		Functor.debugger.extend("HasAuth")("Pass 'valid' to be authorized");

		return {
			...obj,
			[Aspects.HasAuth]: obj[Aspects.HttpRequest].authCookie === "valid",
		};
	}
}

const hasAuthInstance = new HasAuth();
export default hasAuthInstance;
