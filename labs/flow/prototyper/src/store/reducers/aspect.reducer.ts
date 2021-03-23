import {
	AccessGranted,
	ApiResponse,
	Author,
	Authorized,
	CacheTtlSeconds,
	CacheValid,
	Charset,
	Description,
	EndpointType,
	Error,
	FilePath,
	HasPermissions,
	HtmlTagAside,
	HtmlTagBody,
	HtmlTagFooter,
	HtmlTagHead,
	HtmlTagHeader,
	HtmlTagHtml,
	HtmlTagInjectionBody,
	HtmlTagInjectionHead,
	HtmlTagMain,
	HtmlTagNav,
	HttpCache,
	HttpEnded,
	HttpHeaders,
	HttpMethod,
	HttpRedirected,
	HttpRoute,
	HttpSecured,
	HttpServerError,
	HttpStatusCode,
	JavaScriptCodeBundle,
	Json,
	Language,
	LanguagesAvailable,
	LoggedToFile,
	MissingTranslations,
	NodejsExpressRequest,
	NodejsExpressResponse,
	Placeholder,
	Priority,
	ProjectName,
	ReactInitialState,
	ReactRootElement,
	ReactRootElementImport,
	Result,
	Sent,
	SerializedJson,
	StepFinished,
	TcpHttpPort,
	TcpHttpsPort,
	Title,
	Translate,
	TranslateIfOne,
	TranslateIfTwo,
	TranslateIfZero,
	Translated,
	TypeScriptReactCode,
	Value,
	VisitorRoles,
} from "@xde.labs/aspects";
import { AspectEditingActions, AspectEditingActionTypes } from "../actions";

export interface IAspectState {
	aspects: string[];
}
export const initialState: IAspectState = {
	aspects: [
		AccessGranted,
		ApiResponse,
		Author,
		Authorized,
		CacheTtlSeconds,
		CacheValid,
		Charset,
		Description,
		EndpointType,
		Error,
		FilePath,
		HasPermissions,
		HtmlTagAside,
		HtmlTagBody,
		HtmlTagFooter,
		HtmlTagHead,
		HtmlTagHeader,
		HtmlTagHtml,
		HtmlTagInjectionBody,
		HtmlTagInjectionHead,
		HtmlTagMain,
		HtmlTagNav,
		HttpCache,
		HttpEnded,
		HttpHeaders,
		HttpMethod,
		HttpRedirected,
		HttpRoute,
		HttpSecured,
		HttpServerError,
		HttpStatusCode,
		JavaScriptCodeBundle,
		Json,
		Language,
		LanguagesAvailable,
		LoggedToFile,
		MissingTranslations,
		NodejsExpressRequest,
		NodejsExpressResponse,
		Placeholder,
		Priority,
		ProjectName,
		ReactInitialState,
		ReactRootElement,
		ReactRootElementImport,
		Result,
		Sent,
		SerializedJson,
		StepFinished,
		TcpHttpPort,
		TcpHttpsPort,
		Title,
		Translate,
		TranslateIfOne,
		TranslateIfTwo,
		TranslateIfZero,
		Translated,
		TypeScriptReactCode,
		Value,
		VisitorRoles,
	],
};

export default function reducer(
	state: IAspectState = initialState,
	action: AspectEditingActions
): IAspectState {
	switch (action.type) {
		case AspectEditingActionTypes.Add: {
			// TODO: perf
			let aspects = state.aspects;
			const idx = aspects.indexOf(action.payload);
			if (idx === -1) {
				aspects = [...aspects, action.payload];
			}
			return {
				...state,
				aspects,
			};
		}

		default: {
			return state;
		}
	}
}

export const reducerSelectors = {
	selectAspects: (state: IAspectState) => state.aspects,
};
