import { Functor } from "../../../functor/Functor";
import { PartialObject } from "../../../helpers/lambdas";
import { Aspect } from "../../../models";

export class Code301Redirected extends Functor {
	name = "Code301Redirected";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (
				obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>
			) => obj[Aspect.ResponseCode] === 301,
		},
		Aspect.LocationHeader,
	];
	to = [Aspect.Redirected];

	map(obj: { [Aspect.LocationHeader]: string }): {} {
		Functor.debugger.extend("Code301Redirected")(
			`Redirected to ${obj[Aspect.LocationHeader]}`
		);
		return {
			...obj,
			[Aspect.Redirected]: true,
		};
	}
}

const code301RedirectedInstance = new Code301Redirected();
export default code301RedirectedInstance;
