export const unique = (arr: any[]) => {
	return arr.filter((x, i) => arr.indexOf(x) === i);
};
