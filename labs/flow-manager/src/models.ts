export type IObject<T = { [key: string]: any }> = T;

export interface ITestHttpRequest {
	authCookie?: string;
	route: string;
	// isTLS: boolean;
}
