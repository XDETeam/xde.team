import { Functor } from "../../core/Functor";
import { PartialObject } from "../../core/helpers/lambdas";
import { Aspect } from "../../core/models";

export class Code301Redirected extends Functor {
	name = "Code301Redirected";
	from = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (obj: PartialObject<Aspect.ResponseCode, { [Aspect.ResponseCode]?: number }>) =>
				obj[Aspect.ResponseCode] === 301,
		},
		Aspect.LocationHeader,
	];
	to = [Aspect.Redirected];

	move(obj: { [Aspect.LocationHeader]: string }): {} {
		Functor.debugger.extend("Code301Redirected")(`Redirected to ${obj[Aspect.LocationHeader]}`);
		return {
			...obj,
			[Aspect.Redirected]: true,
		};
	}
}

const code301RedirectedInstance = new Code301Redirected();
export default code301RedirectedInstance;
