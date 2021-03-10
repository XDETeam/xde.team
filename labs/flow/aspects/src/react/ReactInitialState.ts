import { IDictionary } from "@xde.labs/common";

export const ReactInitialState = "ReactInitialState" as const;
export type TReactInitialState = {
	[ReactInitialState]: IDictionary;
};
