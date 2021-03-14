export const Result = "Result" as const;

export type TResult<T = any> = {
	[Result]: T;
};
