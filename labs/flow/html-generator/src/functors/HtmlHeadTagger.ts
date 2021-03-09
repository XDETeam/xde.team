import {
	TAuthored,
	Authored,
	TDescribed,
	Described,
	TTitled,
	Titled,
	TCharSetted,
	CharSetted,
	TProjectNamed,
	ProjectNamed,
	THtmlHeadTagged,
	HtmlHeadTagged,
	THtmlHeadTagInjected,
	HtmlHeadTagInjected,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
const pkg = require("../../package.json");

type THtmlHeadTaggerFrom = TTitled &
	Partial<TAuthored & TDescribed & TCharSetted & TProjectNamed & THtmlHeadTagInjected>;

export class HtmlHeadTagger extends PrimitiveFunctor<THtmlHeadTaggerFrom, THtmlHeadTagged> {
	name = "HtmlHeadTagger";
	from = [
		Titled,
		{ aspect: Authored, lambda: Optional },
		{ aspect: Described, lambda: Optional },
		{ aspect: CharSetted, lambda: Optional },
		{ aspect: ProjectNamed, lambda: Optional },
		{ aspect: HtmlHeadTagInjected, lambda: Optional },
	];
	to = [HtmlHeadTagged];

	distinct(obj: THtmlHeadTaggerFrom) {
		const titleTag: string = `<title>${obj[Titled]}${
			!!obj[ProjectNamed] ? ` - ${obj[ProjectNamed]}` : ""
		}</title>`;

		// https://wiki.whatwg.org/wiki/MetaExtensions
		const charsetMetaTag: string = `<meta charset="${obj[CharSetted] ?? "utf-8"}" />`;

		const viewportMetaTag = `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />`;

		const generatorMetaTag = `<meta name="generator" content="${pkg.name} ${pkg.version}" />`;
		// TODO: hardcoded XDE
		const webAuthorMetaTag = `<meta name="web_author" content="XDE Team" />`;

		let creatorMetaTag: string | undefined = undefined;
		if (!!obj[Authored]) {
			creatorMetaTag = `<meta name="creator" content="${obj[Authored]}" />`;
		}

		let descriptionMetaTag: string | undefined = undefined;
		if (!!obj[Described]) {
			descriptionMetaTag = `<meta name="description" content="${obj[Described]}" />`;
		}

		return {
			[HtmlHeadTagged]: `<head>
${titleTag}
${charsetMetaTag}
${viewportMetaTag}
${generatorMetaTag}
${webAuthorMetaTag}${creatorMetaTag ?? ""}${descriptionMetaTag ?? ""}${
				obj[HtmlHeadTagInjected] ?? ""
			}
</head>`,
		};
	}
}

const htmlHeadTaggerInstance = new HtmlHeadTagger();
export default htmlHeadTaggerInstance;
