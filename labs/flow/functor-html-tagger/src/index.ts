import { curryRoute, THtmlInputType, IDictionary } from "@xde.labs/common";
import { THttpMethod, HttpMethod } from "@xde.labs/aspects";
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
	method: THttpMethod[typeof HttpMethod];
	request: TRequest;
	response: TResponse;
	html: {
		// actionName?: string;
		inputTypes: { [key in keyof TRequest]: THtmlInputType };
	};
}

// export interface IHtmlTagger {
// 	header(): string;
// 	footer(): string;
// 	forStatusCode(): string;
// }

// 1. я ему модель - он мне форму под запрос
// 2. могу подставить метаданные в хедер (но есть и дефолтный)
// 3. могу закинуть что-то в футер
// 4. то, что могу прокидывать ему - это jsx?

// @xde/html-generator - models
// xde@html-generator-react
// - engine to generate react components on the fly, using
// - .toString()
// on name focus leave (registration) - check uniqueness

// https://developers.google.com/web/updates/2019/02/rendering-on-the-web

// в принципе, это просто конфиги для модуля с функторами
