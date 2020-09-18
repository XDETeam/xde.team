import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class Error401 implements IFunctor {
	requires = [
		{
			aspect: Aspects.ResponseCode,
			lambda: (asp: number) => !!asp && asp === 401,
		},
	];
	produces = [Aspects.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.GeneratedHtml]: "<div>401 page</div>",
		};
	}
}

const error401Instance = new Error401();
export default error401Instance;
