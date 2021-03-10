import {
	ReactRootElement,
	TReactRootElement,
	THtmlBodyTagged,
	HtmlBodyTagged,
	TJavaScriptCodeBundle,
	JavaScriptCodeBundle,
} from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import ReactDOMServer from "react-dom/server";

type TReactHtmlBodyTaggerFrom = TReactRootElement & TJavaScriptCodeBundle;

export class ReactHtmlBodyTagger extends PrimitiveFunctor<
	TReactHtmlBodyTaggerFrom,
	THtmlBodyTagged
> {
	name = "ReactHtmlBodyTagger";
	from = [ReactRootElement, JavaScriptCodeBundle];
	to = [HtmlBodyTagged];

	distinct(obj: TReactHtmlBodyTaggerFrom) {
		return {
			[HtmlBodyTagged]: `<body><div id="root">${ReactDOMServer.renderToString(
				obj[ReactRootElement]
			)}</div><script>${obj[JavaScriptCodeBundle]}</script></body>`,
		};
	}
}

const reactHtmlBodyTaggerInstance = new ReactHtmlBodyTagger();
export default reactHtmlBodyTaggerInstance;
