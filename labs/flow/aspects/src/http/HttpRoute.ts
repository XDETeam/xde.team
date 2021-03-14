export interface IHttpRoute {
	/**
	 * "http" | "https"
	 */
	protocol: string;
	/**
	 * 'example.com'
	 */
	hostname: string;
	/**
	 * /users
	 */
	path: string;
	/**
	 * /users?sort=desc
	 */
	originalUrl: string;
}

export const HttpRoute = "HttpRoute" as const;

export type THttpRoute = {
	[HttpRoute]: IHttpRoute;
};
