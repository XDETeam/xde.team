import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class Http implements IFunctor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.IsHttp];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.IsHttp]: true,
		};
	}
}

const httpInstance = new Http();
export default httpInstance;
