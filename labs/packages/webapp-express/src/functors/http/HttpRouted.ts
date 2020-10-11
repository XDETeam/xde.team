import { Functor } from "@xde/flow-manager";
import { Request } from "express";
import { APP_HTTP_PORT, APP_TLS_PORT } from "../../config";

import { Aspect } from "../../models/aspects";

export interface IHttpRouted {
	/**
	 * "http" | "https"
	 */
	protocol: string;
	/**
	 * 'example.com'
	 */
	hostname: string;
	/**
	 * Undefined when one of 80, 443
	 */
	nonStandardPort?: number;
	/**
	 * /users
	 */
	path: string;
	/**
	 * /users?sort=desc
	 */
	originalUrl: string;
}

export class HttpRouted extends Functor<Aspect> {
	name = "HttpRouted";
	from = [Aspect.HttpRequest];
	to = [Aspect.HttpRouted];

	map(obj: { [Aspect.HttpRequest]: Request }): {} {
		const port = obj[Aspect.HttpRequest].secure
			? (APP_TLS_PORT as number)
			: (APP_HTTP_PORT as number);
		const routed: IHttpRouted = {
			protocol: obj[Aspect.HttpRequest].protocol,
			hostname: obj[Aspect.HttpRequest].hostname,
			nonStandardPort: port === 80 || port === 443 ? undefined : port,
			path: obj[Aspect.HttpRequest].path,
			originalUrl: obj[Aspect.HttpRequest].originalUrl,
		};
		return {
			...obj,
			[Aspect.HttpRouted]: routed,
		};
	}
}

const httpRoutedInstance = new HttpRouted();
export default httpRoutedInstance;
