import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects";

export class IsAdmin implements IFunctor {
	requires = [Aspects.HasAuth];
	produces = [Aspects.IsAdmin];

	move(obj: { [Aspects.HasAuth]: boolean }): {} {
		return {
			...obj,
			[Aspects.IsAdmin]: obj[Aspects.HasAuth] && Math.random() > 0.5,
		};
	}
}

const isAdminInstance = new IsAdmin();
export default isAdminInstance;
