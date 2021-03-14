export const Value = "Value" as const;

export type TValue<T = any> = {
	[Value]: T;
};
