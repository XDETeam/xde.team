export const HttpMethod = "HttpMethod" as const;

export type THttpMethod = {
	[HttpMethod]: "POST" | "GET" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS";
};
