export const CacheValid = "CacheValid" as const;

export type TCacheValid<T extends boolean = boolean> = {
	[CacheValid]: T;
};
