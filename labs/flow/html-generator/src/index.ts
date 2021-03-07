import { curryRoute, THtmlInputType, IDictionary } from "@xde.labs/common";
import { THttpMethod } from "@xde.labs/endpoint";
export * from "./app";

export interface IComplexComponent<TNodeType> {
	full: TNodeType;
	short: TNodeType;
	selfLink: TNodeType;
}

export interface ICommonEndpoint {
	name: string;
	route: string;
}

export interface IHtmlEndpoint<TNodeType> extends ICommonEndpoint {
	component: IComplexComponent<TNodeType>;
}

export interface IApiEndpoint<TRequest extends IDictionary, TResponse> extends ICommonEndpoint {
	method: THttpMethod;
	request: TRequest;
	response: TResponse;
	html: {
		// actionName?: string;
		inputTypes: { [key in keyof TRequest]: THtmlInputType };
	};
}
