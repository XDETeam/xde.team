import { THttpMethod } from "@xde/common";

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

	method: THttpMethod;
}

export const HttpRouted = "HttpRouted" as const;

export type THttpRouted = {
	[HttpRouted]: IHttpRouted;
};
