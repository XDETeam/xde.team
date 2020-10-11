export const isCircular = (obj: {}): boolean => {
	try {
		JSON.stringify(obj);
	} catch (e) {
		return true;
	}
	return false;
};

export const replaceCircular = (obj: {}, replaceWith: string = "[CIRCULAR]"): {} => {
	const o: any = { ...obj };
	Object.keys(o).forEach((key) => {
		if (typeof o[key] === "object" && isCircular(o[key])) {
			o[key] = replaceWith;
		}
	});
	return o;
};
