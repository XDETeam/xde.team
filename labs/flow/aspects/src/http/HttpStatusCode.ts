export const HttpStatusCode = "HttpStatusCode" as const;

export type THttpStatusCode<T extends number = number> = {
	// TODO: list?
	[HttpStatusCode]: T;
};
