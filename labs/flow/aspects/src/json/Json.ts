import { IDictionary } from "@xde.labs/common";

export const Json = "Json" as const;
export type TJson = {
	[Json]: IDictionary;
};
