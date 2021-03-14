export const Error = "Error" as const;

export type TError<T = string> = {
	[Error]: T;
};
