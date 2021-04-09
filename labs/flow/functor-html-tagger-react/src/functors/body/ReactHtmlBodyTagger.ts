import {
	ReactRootElement,
	TReactRootElement,
	THtmlTagBody,
	HtmlTagBody,
	TJavaScriptCodeBundle,
	JavaScriptCodeBundle,
} from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";
import ReactDOMServer from "react-dom/server";

type TReactHtmlBodyTaggerFrom = TReactRootElement & TJavaScriptCodeBundle;

export class ReactHtmlBodyTagger extends PrimitiveFunctor<TReactHtmlBodyTaggerFrom, THtmlTagBody> {
	name = "ReactHtmlBodyTagger";
	from = [ReactRootElement, JavaScriptCodeBundle];
	to = [HtmlTagBody];

	distinct(obj: TReactHtmlBodyTaggerFrom) {
		return {
			[HtmlTagBody]: `<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root">${ReactDOMServer.renderToString(obj[ReactRootElement])}</div>
<script>${obj[JavaScriptCodeBundle]}</script>
</body>`,
		};
	}
}

const reactHtmlBodyTaggerInstance = new ReactHtmlBodyTagger();
export default reactHtmlBodyTaggerInstance;
