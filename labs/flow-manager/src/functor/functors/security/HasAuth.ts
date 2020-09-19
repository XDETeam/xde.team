import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";
import { ITestHttpRequest } from "../../../models";
import { appDebug } from "../../../helpers/debug";

const debug = appDebug.extend("HasAuth");

export class HasAuth implements IFunctor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.HasAuth];

	move(obj: { [Aspects.HttpRequest]: ITestHttpRequest }): {} {
		debug("Pass 'valid' to be authorized");

		return {
			...obj,
			[Aspects.HasAuth]: obj[Aspects.HttpRequest].authCookie === "valid",
		};
	}
}

const hasAuthInstance = new HasAuth();
export default hasAuthInstance;
