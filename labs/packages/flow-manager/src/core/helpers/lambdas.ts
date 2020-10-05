import { AspectType, IObject } from "../models";

export type PartialObject<
	TAspect extends string,
	TObject extends { [key in TAspect]?: any }
> = TObject;

export interface ILambda<TAspect extends string> {
	(partial: PartialObject<TAspect, any> | PartialObject<TAspect, any>[]): boolean;
	type?: AspectType;
}

export const Some: ILambda<any> = (partial) => {
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
export const Optional: ILambda<any> = () => true;
Optional.type = AspectType.Optional;

export const Undefined: ILambda<any> = (partial) => {
	if (!Array.isArray(partial)) {
		return Object.keys(partial).every((aspect) => partial[aspect] === undefined);
	} else {
		throw new Error(
			`You are using "Undefined" lambda with an array of aspects arrays. Flatten to one-level array.`
		);
	}
};
Undefined.type = AspectType.Undefined;

export const Exists: ILambda<any> = (partial) => {
	if (!Array.isArray(partial)) {
		return Object.keys(partial).every((aspect) => partial[aspect] !== undefined);
	} else {
		throw new Error(
			`You are using "Exists" lambda with an array of aspects arrays. Flatten to one-level array.`
		);
	}
};
Exists.type = AspectType.Exists;
