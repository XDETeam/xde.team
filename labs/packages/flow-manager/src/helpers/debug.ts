import Debug from "debug";

export const appDebug = Debug("app");

if (process.env.NODE_ENV === "production") {
	Debug.disable();
}
