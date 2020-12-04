import { IDictionary } from "@xde.labs/common";

export const HttpHeaders = "HttpHeaders" as const;

export type THttpHeaders<T extends object = IDictionary> = {
	[HttpHeaders]: T;
};

export type TLocationHeader = {
	Location: string;
};
