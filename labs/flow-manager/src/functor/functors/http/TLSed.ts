import { Aspects } from "../../../aspects";
import { ITestHttpRequest } from "../../../models";
import { IFunctor } from "../../Functor";

// TODO: Rename to Secured
export class TLSed implements IFunctor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.TLSed];

	move(obj: { [Aspects.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspects.TLSed]: obj[Aspects.HttpRequest].isTLS,
		};
	}
}

const tLSedInstance = new TLSed();
export default tLSedInstance;
