import { IDictionary } from "@xde/common";

export interface IDistinctionManager {
	merge<TDistinctions extends IDictionary = IDictionary>(
		distinctions: TDistinctions[]
	): TDistinctions;
}

export class DistinctionManager implements IDistinctionManager {
	merge<TDistinctions extends IDictionary = IDictionary>(
		distinctions: TDistinctions[]
	): TDistinctions {
		return distinctions.reduce((a: TDistinctions, b: TDistinctions) => {
			b = {
				...a,
				...b,
			};
			return b;
		}, {} as TDistinctions);
	}
}

const distinctionManagerInstance = new DistinctionManager();
export default distinctionManagerInstance;
