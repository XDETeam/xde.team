import { IHookFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class App404Error implements IHookFunctor {
	isHook: true = true;

	requires = [{ aspect: Aspects.RouteHandled, lambda: (handled: boolean) => !handled }];
	produces = [Aspects.ResponseCode];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.ResponseCode]: 404,
		};
	}
}

const app404ErrorInstance = new App404Error();
export default app404ErrorInstance;
