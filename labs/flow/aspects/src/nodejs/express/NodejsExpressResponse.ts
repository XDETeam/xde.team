import { Response } from "express";

export const NodejsExpressResponse = "NodejsExpressResponse" as const;

export type TNodejsExpressResponse = {
	[NodejsExpressResponse]: Response;
};
