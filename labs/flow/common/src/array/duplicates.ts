import { unique } from "./unique";

export const duplicates = (arr: any[]) => {
	return unique(arr.filter((item, i) => arr.includes(item, i + 1)));
};
