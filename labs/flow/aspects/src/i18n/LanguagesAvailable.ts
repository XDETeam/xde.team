import { TLanguage, Language } from "./Language";

export const LanguagesAvailable = "LanguagesAvailable" as const;

export type TLanguagesAvailable = {
	[LanguagesAvailable]: Array<TLanguage[typeof Language]>;
};
