export const AccessGranted = "AccessGranted" as const;

export type TAccessGranted<T extends boolean = boolean> = {
	[AccessGranted]: T;
};
