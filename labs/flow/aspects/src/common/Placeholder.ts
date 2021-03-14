export const Placeholder = "Placeholder" as const;

export type TPlaceholder<T = string> = {
	[Placeholder]: T;
};
