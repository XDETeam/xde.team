import { Optional, PrimitiveFunctor } from "@xde.labs/flow-manager";
import { build } from "esbuild";
import fs from "fs/promises";
import nodePath from "path";
import {
	JavaScriptCodeBundle,
	TJavaScriptCodeBundle,
	TypeScriptReactCode,
	TTypeScriptReactCode,
} from "@xde.labs/aspects";

import { RequestHash, TRequestHash } from "../RequestHasher";

export const TypeScriptReactCodeBundlerConfig = "TypeScriptReactCodeBundlerConfig" as const;
export type TTypeScriptReactCodeBundlerConfig = {
	[TypeScriptReactCodeBundlerConfig]: {
		dirname?: string;
		absWorkingDir?: string;
	};
};

type TTypeScriptReactCodeBundlerFrom = TRequestHash &
	TTypeScriptReactCode &
	Partial<TTypeScriptReactCodeBundlerConfig>;

export class TypeScriptReactCodeBundler extends PrimitiveFunctor<
	TTypeScriptReactCodeBundlerFrom,
	TJavaScriptCodeBundle
> {
	name = "TypeScriptReactCodeBundler";
	from = [
		RequestHash,
		TypeScriptReactCode,
		{ aspect: TypeScriptReactCodeBundlerConfig, lambda: Optional },
	];
	to = [JavaScriptCodeBundle];

	async distinct(obj: TTypeScriptReactCodeBundlerFrom) {
		const dirname = obj[TypeScriptReactCodeBundlerConfig]?.dirname ?? __dirname;
		const absWorkingDir = obj[TypeScriptReactCodeBundlerConfig]?.absWorkingDir ?? process.cwd();

		const pathTmp = nodePath.join(dirname, `.${obj[RequestHash]}.jsx`);

		const result = await fs
			.mkdir(nodePath.dirname(pathTmp), { recursive: true })
			.then(async () => {
				await fs.writeFile(pathTmp, obj[TypeScriptReactCode], {
					encoding: "utf-8",
					flag: "w",
				});
				const res = await build({
					absWorkingDir,
					entryPoints: [pathTmp],
					write: false,
					bundle: true,
					platform: "browser",
					define: {
						"process.env.NODE_ENV":
							process.env.NODE_ENV !== "development"
								? '"production"'
								: '"development"',
					},
					minify: process.env.NODE_ENV !== "development",
					treeShaking: process.env.NODE_ENV !== "development" ? true : undefined,
					logLevel: process.env.NODE_ENV === "development" ? "info" : "silent",
				});
				// TODO: script replacing is temporary?
				const data = res.outputFiles?.[0].text.replace(
					/"<script\><\/script\>"/g,
					`"<script></scri" + "pt>"`
				);

				await fs.unlink(pathTmp);

				return data;
			});

		return {
			[JavaScriptCodeBundle]: result,
		};
	}
}

const typeScriptReactCodeBundlerInstance = new TypeScriptReactCodeBundler();
export default typeScriptReactCodeBundlerInstance;
