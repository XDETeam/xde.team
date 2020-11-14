export const Priority = "Priority" as const;

export type TPriority<T extends number = number> = {
	[Priority]: T;
};
