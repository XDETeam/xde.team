import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";

export class Code301Redirected extends Functor {
	name = "Code301Redirected";
	requires = [
		{
			aspect: Aspect.ResponseCode,
			lambda: (asp: number) => asp === 301,
		},
		Aspect.LocationHeader,
	];
	produces = [Aspect.Redirected];

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
