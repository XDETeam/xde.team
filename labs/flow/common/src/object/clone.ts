import { IDictionary } from "../types";

export const deepCloneUnsafe = <T extends IDictionary = IDictionary>(obj: T): T =>
	JSON.parse(JSON.stringify(obj));
