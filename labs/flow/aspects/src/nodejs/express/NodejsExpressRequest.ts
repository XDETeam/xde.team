import { Request } from "express";

export const NodejsExpressRequest = "NodejsExpressRequest" as const;

export type TNodejsExpressRequest = {
	[NodejsExpressRequest]: Request;
};
