import { Functor } from "../../core/Functor";
import { Aspect } from "../../core/models";
import { ITestHttpRequest } from "../../models";

export class HttpRouted extends Functor {
	name = "HttpRouted";
	from = [Aspect.HttpRequest];
	to = [Aspect.HttpRouted];

	move(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.HttpRouted]: obj[Aspect.HttpRequest].route,
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
