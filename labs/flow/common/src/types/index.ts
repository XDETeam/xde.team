export interface Constructable<T> {
	new (...args: any): T;
}

export type TUndefined<T> = Record<keyof T, undefined>;

export interface IDictionary<T = any> {
	[key: string]: T;
}

// Iterates over types, including unions
export type TKeysOf<T> = T extends any ? keyof T : never;
