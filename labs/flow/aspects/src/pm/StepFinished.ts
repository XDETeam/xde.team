export const StepFinished = "StepFinished" as const;

export type TStepFinished<T extends number = number> = {
	[StepFinished]: T;
};
