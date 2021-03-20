import {
	TReactInitialState,
	ReactInitialState,
	HtmlTagInjectionHead,
	THtmlTagInjectionHead,
	THtmlTagBody,
	TReactRootElement,
	TReactRootElementImport,
	HtmlTagBody,
	ReactRootElement,
	ReactRootElementImport,
	THttpRoute,
	TAuthor,
	TCharset,
	TDescription,
	TEndpointType,
	THtmlTagHtml,
	TLanguage,
	TProjectName,
	TTitle,
	Title,
	EndpointType,
	Endpoint,
	Author,
	Charset,
	Description,
	Language,
	ProjectName,
	HttpRoute,
	HtmlTagHtml,
	TCacheValid,
	CacheValid,
	THttpCache,
	HttpCache,
} from "@xde.labs/aspects";
import { CompositeFunctor, Some, Optional } from "@xde.labs/flow-manager";
import hydrateWithReactElementPlaceholderInstance from "./functors/body/HydrateWithReactElementPlaceholder";
import reactElementInToTypeScriptCodeInserterInstance from "./functors/body/ReactElementInToTypeScriptCodeInserter";
import reactHtmlBodyTaggerInstance from "./functors/body/ReactHtmlBodyTagger";
import typeScriptReactCodeBundlerInstance, {
	TTypeScriptReactCodeBundlerConfig,
	TypeScriptReactCodeBundlerConfig,
} from "./functors/body/TypeScriptReactCodeBundler";
import cachedSetterInstance from "./functors/cacher/CachedSetter";
import cachedValidInstance from "./functors/cacher/CachedValid";
import jsonSerializerInstance from "./functors/initial-state/JsonSerializer";
import reactInitialStateAsJsonInstance from "./functors/initial-state/ReactInitialStateAsJson";
import reactInitialStateHeadInjecterInstance from "./functors/initial-state/ReactInitialStateHeadInjecter";
import { PriorityInitialWrapper, RePrioritizedWrapper } from "@xde.labs/functors";
import { htmlGenerator, THtmlGeneratorFrom } from "@xde.labs/html-generator";
import requestHasherInstance, {
	RequestForceHash,
	RequestHashAdditionalToRouteParameters,
} from "./functors/RequestHasher";
import {
	RequestHash,
	TRequestForceHash,
	TRequestHash,
	TRequestHashAdditionalToRouteParameters,
} from "./functors/RequestHasher";

export class ReactInitialStater extends CompositeFunctor<
	TReactInitialState,
	THtmlTagInjectionHead
> {
	name = "ReactInitialStater";
	from = [ReactInitialState];
	to = [HtmlTagInjectionHead];
}
const reactInitialStater = new ReactInitialStater();
reactInitialStater.addChildren([
	jsonSerializerInstance,
	reactInitialStateAsJsonInstance,
	reactInitialStateHeadInjecterInstance,
]);

export class ReactBodier extends CompositeFunctor<
	TReactRootElementImport &
		TReactRootElement &
		TRequestHash &
		Partial<TTypeScriptReactCodeBundlerConfig>,
	THtmlTagBody
> {
	name = "ReactBodier";
	from = [
		ReactRootElementImport,
		ReactRootElement,
		RequestHash,
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
	];
	to = [HtmlTagBody];
}
const reactBodier = new ReactBodier();
reactBodier.addChildren([
	hydrateWithReactElementPlaceholderInstance,
	reactElementInToTypeScriptCodeInserterInstance,
	reactHtmlBodyTaggerInstance,
	typeScriptReactCodeBundlerInstance,
]);

export const reactHtmlGeneratorWrapper = new PriorityInitialWrapper<
	TReactRootElementImport &
		TReactRootElement &
		TRequestHash &
		Partial<TTypeScriptReactCodeBundlerConfig> &
		Partial<TReactInitialState> &
		TCacheValid<false>,
	THtmlTagBody & Partial<THtmlTagInjectionHead>,
	1
>(
	"reactHtmlGeneratorWrapper",
	[
		ReactRootElementImport,
		ReactRootElement,
		RequestHash,
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
		{ aspect: CacheValid, lambda: (obj: TCacheValid<false>) => obj[CacheValid] === false },
		{ aspect: ReactInitialState, lambda: Optional },
	],
	[HtmlTagBody, { aspect: HtmlTagInjectionHead, lambda: Optional }],
	1
);
reactHtmlGeneratorWrapper.addChildren([reactBodier, reactInitialStater]);

export const htmlGeneratorWrapper = new RePrioritizedWrapper<
	THtmlGeneratorFrom,
	THtmlTagHtml,
	1,
	2
>("htmlGeneratorWrapper", htmlGenerator.from, htmlGenerator.to, 2, 1);
htmlGeneratorWrapper.addChildren(htmlGenerator);

export class HtmlGeneratorReact extends CompositeFunctor<
	TEndpointType<Endpoint.Html> &
		THttpRoute &
		TTitle &
		TReactRootElementImport &
		TReactRootElement &
		Partial<TRequestForceHash & TRequestHashAdditionalToRouteParameters> &
		Partial<TTypeScriptReactCodeBundlerConfig> &
		Partial<TReactInitialState> &
		Partial<TAuthor & TDescription & TCharset & TLanguage & TProjectName> &
		Partial<THttpCache>,
	THtmlTagHtml
> {
	name = "HtmlGeneratorReact";
	from = [
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType<Endpoint.Html>) => obj[EndpointType] === Endpoint.Html,
		},
		HttpRoute,
		Title,
		ReactRootElementImport,
		ReactRootElement,
		{ aspect: RequestForceHash, lambda: Optional },
		{ aspect: RequestHashAdditionalToRouteParameters, lambda: Optional },
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
		{ aspect: ReactInitialState, lambda: Optional },
		{ aspect: Author, lambda: Optional },
		{ aspect: Description, lambda: Optional },
		{ aspect: Charset, lambda: Optional },
		{ aspect: Language, lambda: Optional },
		{ aspect: ProjectName, lambda: Optional },
		{ aspect: HttpCache, lambda: Optional },
	];
	to = [HtmlTagHtml];
}
export const htmlGeneratorReact = new HtmlGeneratorReact();
htmlGeneratorReact.addChildren([
	requestHasherInstance,
	cachedValidInstance,
	cachedSetterInstance,
	reactHtmlGeneratorWrapper,
	htmlGeneratorWrapper,
]);

// TODO: use streams?
