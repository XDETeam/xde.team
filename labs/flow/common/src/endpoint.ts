import { ReactNode } from "react";

import { THttpMethod } from "./http";

export interface IComplexComponent {
	full: ReactNode;
	short: ReactNode;
	selfLink: ReactNode;
}

export interface ICommonEndpoint {
	route: string;
}

export interface IHtmlEndpoint extends ICommonEndpoint {
	component: IComplexComponent;
}

export interface IApiEndpoint<TResponse> extends ICommonEndpoint {
	method: THttpMethod;
	request: object;
	response: TResponse;
}
