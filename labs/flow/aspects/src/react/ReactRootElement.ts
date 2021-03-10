import { ReactElement } from "react";

export const ReactRootElement = "ReactRootElement" as const;
export type TReactRootElement = {
	[ReactRootElement]: ReactElement;
};
