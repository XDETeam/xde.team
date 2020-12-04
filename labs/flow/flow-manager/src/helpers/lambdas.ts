import { IDictionary } from "@xde.labs/common";

import { AspectType } from "../models";

export interface ILambdaCommon {
	type?: AspectType;
}

export interface ILambdaPrimitive<TPartial extends IDictionary> extends ILambdaCommon {
	(partial: TPartial): boolean;
}

/**
 * When aspects specified as array of arrays.
 */
export interface ILambdaDeep<TPartial extends IDictionary> extends ILambdaCommon {
	(partial: TPartial[]): boolean;
}

export type Lambda<TPartial extends IDictionary> = ILambdaPrimitive<TPartial> &
	ILambdaDeep<TPartial>;

export const Some: Lambda<any> = (partial: IDictionary | IDictionary[]) => {
	if (!Array.isArray(partial)) {
		return Object.keys(partial).some((aspect) => partial[aspect] !== undefined);
	} else {
		return partial.some((part) =>
			Object.keys(part).every((aspect) => part[aspect] !== undefined)
		);
	}
};
Some.type = AspectType.Some;

/**
 * Useful for visualizations
 */
export const Optional: Lambda<any> = () => true;
Optional.type = AspectType.Optional;

export const Undefined: Lambda<any> = (partial: IDictionary | IDictionary[]) => {
	if (!Array.isArray(partial)) {
		return Object.keys(partial).every((aspect) => partial[aspect] === undefined);
	} else {
		throw new Error(
			`You are using "Undefined" lambda with an array of aspects arrays. Flatten to one-level array.`
		);
	}
};
Undefined.type = AspectType.Undefined;

export const Exists: Lambda<any> = (partial: IDictionary | IDictionary[]) => {
	if (!Array.isArray(partial)) {
		return Object.keys(partial).every((aspect) => partial[aspect] !== undefined);
	} else {
		throw new Error(
			`You are using "Exists" lambda with an array of aspects arrays. Flatten to one-level array.`
		);
	}
};
Exists.type = AspectType.Exists;
