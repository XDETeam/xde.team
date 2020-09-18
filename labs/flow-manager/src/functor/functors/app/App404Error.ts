import { IHookFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

// Логически "все роуты, которые неизвестны нам - это 404"
// Но не сильно хочется иметь все роуты в одном месте
// Хак - добавить тип функторов, которые выполняются исключительно если нет ни одного другого функтора, который бы занялся объектом (перед освобождением объекта).
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
