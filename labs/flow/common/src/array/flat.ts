export const flatDeep = <TResult = any[]>(arr: any[]): TResult => {
	return arr.reduce(
		(acc, val) => (Array.isArray(val) ? acc.concat(flatDeep(val)) : acc.concat(val)),
		[]
	);
};
