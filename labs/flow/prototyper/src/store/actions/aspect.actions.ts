export enum AspectEditingActionTypes {
	Add = "IAspectState.Add",
}

export interface IAspectEditingAddAction {
	type: typeof AspectEditingActionTypes.Add;
	payload: string;
}

export type AspectEditingActions = IAspectEditingAddAction;

export const aspectEditingAdd = (
	payload: IAspectEditingAddAction["payload"]
): AspectEditingActions => ({
	type: AspectEditingActionTypes.Add,
	payload,
});
