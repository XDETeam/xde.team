import { Functor } from "../../../functor/Functor";
import { Aspect } from "../../../models";
import { ITestHttpRequest } from "../models";

export class HttpRouted extends Functor {
	name = "HttpRouted";
	from = [Aspect.HttpRequest];
	to = [Aspect.HttpRouted];

	map(obj: { [Aspect.HttpRequest]: ITestHttpRequest }): {} {
		return {
			...obj,
			[Aspect.HttpRouted]: obj[Aspect.HttpRequest].route,
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
