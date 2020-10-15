import { IDictionary } from "@xde/common";

export const HttpHeaders = "HttpHeaders" as const;

export type THttpHeaders = {
	[HttpHeaders]: IDictionary;
};
