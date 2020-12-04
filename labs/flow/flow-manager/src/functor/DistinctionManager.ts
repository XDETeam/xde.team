import { IDictionary, replaceCircular } from "@xde.labs/common";

// TODO: https://stackoverflow.com/questions/49682569/typescript-merge-object-types
export interface IDistinctionManager {
	merge<TDistinctions extends IDictionary = IDictionary>(
		distinctions: TDistinctions[]
	): IDictionary;
}

export class DistinctionManager implements IDistinctionManager {
	merge<TDistinctions extends IDictionary = IDictionary>(
		distinctions: TDistinctions[]
	): IDictionary {
		return distinctions.reduce((all: TDistinctions, curr: TDistinctions) => {
			const existingArrayKeys = Object.keys(curr)
				.filter((x) => Array.isArray(curr[x]))
				.filter((x) => x in all);

			const currCopy = { ...curr };

			existingArrayKeys.forEach((key: keyof typeof curr) => {
				if (Array.isArray(all[key])) {
					currCopy[key] = all[key].concat(currCopy[key]);
				} else {
					throw new Error(
						`Expected existing ${key} to be an array. Got ${JSON.stringify(
							replaceCircular(all[key]),
							null,
							2
						)}`
					);
				}
			});

			return {
				...all,
				...currCopy,
			};
		}, {} as TDistinctions);
	}
}

const distinctionManagerInstance = new DistinctionManager();
export default distinctionManagerInstance;
