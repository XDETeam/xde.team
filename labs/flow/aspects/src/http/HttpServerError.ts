export const HttpServerError = "HttpServerError" as const;

export type THttpServerError = {
	[HttpServerError]: string;
};
