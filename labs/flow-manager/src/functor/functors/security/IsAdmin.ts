import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects";

export class IsAdmin implements IFunctor {
	requires = [Aspects.HasAuth];
	produces = [Aspects.IsAdmin];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.IsAdmin]: Math.random() > 0.5,
		};
	}
}

const isAdminInstance = new IsAdmin();
export default isAdminInstance;
