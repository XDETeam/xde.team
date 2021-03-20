import { IDictionary } from "@xde.labs/common";

export const HttpHeaders = "HttpHeaders" as const;

export type THttpHeaders<T extends object = IDictionary> = {
	[HttpHeaders]: T;
};

export type TAllowHeader = {
	Allow: string;
};

export type TCacheControlHeader = {
	"Cache-Control": string;
};

export type TContentLanguageHeader = {
	"Content-Language": string;
};

export type TLocationHeader = {
	Location: string;
};
