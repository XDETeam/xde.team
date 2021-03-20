import {
	TAuthor,
	Author,
	TDescription,
	Description,
	TTitle,
	Title,
	TCharset,
	Charset,
	TProjectName,
	ProjectName,
	THtmlTagHead,
	HtmlTagHead,
	THtmlTagInjectionHead,
	HtmlTagInjectionHead,
} from "@xde.labs/aspects";
import { PrimitiveFunctor, Optional } from "@xde.labs/flow-manager";
const pkg = require("../../package.json");

type THtmlHeadTaggerFrom = TTitle &
	Partial<TAuthor & TDescription & TCharset & TProjectName & THtmlTagInjectionHead>;

export class HtmlHeadTagger extends PrimitiveFunctor<THtmlHeadTaggerFrom, THtmlTagHead> {
	name = "HtmlHeadTagger";
	from = [
		Title,
		{ aspect: Author, lambda: Optional },
		{ aspect: Description, lambda: Optional },
		{ aspect: Charset, lambda: Optional },
		{ aspect: ProjectName, lambda: Optional },
		{ aspect: HtmlTagInjectionHead, lambda: Optional },
	];
	to = [HtmlTagHead];

	distinct(obj: THtmlHeadTaggerFrom) {
		const titleTag: string = `<title>${obj[Title]}${
			!!obj[ProjectName] ? ` - ${obj[ProjectName]}` : ""
		}</title>`;

		// https://wiki.whatwg.org/wiki/MetaExtensions
		const charsetMetaTag: string = `<meta charset="${obj[Charset] ?? "utf-8"}" />`;

		const viewportMetaTag = `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />`;

		const generatorMetaTag = `<meta name="generator" content="${pkg.name} ${pkg.version}" />`;
		// TODO: hardcoded XDE
		const webAuthorMetaTag = `<meta name="web_author" content="XDE Team" />`;

		let creatorMetaTag: string | undefined = undefined;
		if (!!obj[Author]) {
			creatorMetaTag = `<meta name="creator" content="${obj[Author]}" />`;
		}

		let descriptionMetaTag: string | undefined = undefined;
		if (!!obj[Description]) {
			descriptionMetaTag = `<meta name="description" content="${obj[Description]}" />`;
		}

		return {
			[HtmlTagHead]: `<head>
${titleTag}
${charsetMetaTag}
${viewportMetaTag}
${generatorMetaTag}
${webAuthorMetaTag}${creatorMetaTag ?? ""}${descriptionMetaTag ?? ""}${
				obj[HtmlTagInjectionHead] ?? ""
			}
</head>`,
		};
	}
}

const htmlHeadTaggerInstance = new HtmlHeadTagger();
export default htmlHeadTaggerInstance;
