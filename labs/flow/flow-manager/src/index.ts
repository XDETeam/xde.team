import Debug from "debug";
import { isProduction } from "@xde/common";

export * from "./functor";
export * from "./helpers/lambdas";
export * from "./models";

if (!process.env.DEBUG) {
	Debug.enable("@xde/fm:functor*");

	if (!isProduction()) {
		Debug.enable("@xde/fm:functor*,@xde/fm:short*");
	}
}
