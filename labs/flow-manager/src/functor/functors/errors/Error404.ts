import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class Error404 implements IFunctor {
	requires = [
		{
			aspect: Aspects.ResponseCode,
			lambda: (asp: number) => !!asp && asp === 404,
		},
	];
	produces = [Aspects.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.GeneratedHtml]: "<div>404 page</div>",
		};
	}
}

const error404Instance = new Error404();
export default error404Instance;
