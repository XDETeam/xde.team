import {
	TReactInitialState,
	ReactInitialState,
	HtmlHeadTagInjected,
	THtmlHeadTagInjected,
	THtmlBodyTagged,
	TReactRootElement,
	TReactRootElementImport,
	HtmlBodyTagged,
	ReactRootElement,
	ReactRootElementImport,
	THttpRouted,
	TAuthored,
	TCharSetted,
	TDescribed,
	TEndpointType,
	THtmlHtmlTagged,
	TLanguaged,
	TProjectNamed,
	TTitled,
	Titled,
	EndpointType,
	Endpoint,
	Authored,
	CharSetted,
	Described,
	Languaged,
	ProjectNamed,
	HttpRouted,
	HtmlHtmlTagged,
	TCacheValid,
	CacheValid,
	THttpCached,
	HttpCached,
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

export class ReactInitialStater extends CompositeFunctor<TReactInitialState, THtmlHeadTagInjected> {
	name = "ReactInitialStater";
	from = [ReactInitialState];
	to = [HtmlHeadTagInjected];
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
	THtmlBodyTagged
> {
	name = "ReactBodier";
	from = [
		ReactRootElementImport,
		ReactRootElement,
		RequestHash,
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
	];
	to = [HtmlBodyTagged];
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
	THtmlBodyTagged & Partial<THtmlHeadTagInjected>,
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
	[HtmlBodyTagged, { aspect: HtmlHeadTagInjected, lambda: Optional }],
	1
);
reactHtmlGeneratorWrapper.addChildren([reactBodier, reactInitialStater]);

export const htmlGeneratorWrapper = new RePrioritizedWrapper<
	THtmlGeneratorFrom,
	THtmlHtmlTagged,
	1,
	2
>("htmlGeneratorWrapper", htmlGenerator.from, htmlGenerator.to, 2, 1);
htmlGeneratorWrapper.addChildren(htmlGenerator);

export class HtmlGeneratorReact extends CompositeFunctor<
	TEndpointType &
		THttpRouted &
		TTitled &
		TReactRootElementImport &
		TReactRootElement &
		Partial<TRequestForceHash & TRequestHashAdditionalToRouteParameters> &
		Partial<TTypeScriptReactCodeBundlerConfig> &
		Partial<TReactInitialState> &
		Partial<TAuthored & TDescribed & TCharSetted & TLanguaged & TProjectNamed> &
		Partial<THttpCached>,
	THtmlHtmlTagged
> {
	name = "HtmlGeneratorReact";
	from = [
		{
			aspect: EndpointType,
			lambda: (obj: TEndpointType) => obj[EndpointType] === Endpoint.Html,
		},
		HttpRouted,
		Titled,
		ReactRootElementImport,
		ReactRootElement,
		{ aspect: RequestForceHash, lambda: Optional },
		{ aspect: RequestHashAdditionalToRouteParameters, lambda: Optional },
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
		{ aspect: ReactInitialState, lambda: Optional },
		{ aspect: Authored, lambda: Optional },
		{ aspect: Described, lambda: Optional },
		{ aspect: CharSetted, lambda: Optional },
		{ aspect: Languaged, lambda: Optional },
		{ aspect: ProjectNamed, lambda: Optional },
		{ aspect: HttpCached, lambda: Optional },
	];
	to = [HtmlHtmlTagged];
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
