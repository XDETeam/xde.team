import { IAspectChangeRequest, IFunctorEditingState } from "../reducers/functor.reducer";
import { TreePath } from "react-sortable-tree";

export enum FunctorEditingActionTypes {
	ChangeCurrentAspect = "IFunctorEditingState.ChangeCurrentAspect",
	RemoveCurrentAspect = "IFunctorEditingState.RemoveCurrentAspect",
	AddCurrentAspect = "IFunctorEditingState.AddCurrentAspect",
	RenameCurrent = "IFunctorEditingState.RenameCurrent",
	AddChild = "IFunctorEditingState.AddChild",
	// TODO: Option to keep children
	Remove = "IFunctorEditingState.Remove",
	SetCurrentPath = "IFunctorEditingState.SetCurrentPath",
	SetFunctors = "IFunctorEditingState.SetFunctors",
}

export interface IFunctorEditingChangeCurrentAspectAction {
	type: typeof FunctorEditingActionTypes.ChangeCurrentAspect;
	payload: IAspectChangeRequest;
}

export interface IFunctorEditingRemoveCurrentAspectAction {
	type: typeof FunctorEditingActionTypes.RemoveCurrentAspect;
	payload: Omit<IAspectChangeRequest, "aspect">;
}

export interface IFunctorEditingAddCurrentAspectAction {
	type: typeof FunctorEditingActionTypes.AddCurrentAspect;
	payload: Pick<IAspectChangeRequest, "property">;
}

export interface IFunctorEditingRenameCurrentAction {
	type: typeof FunctorEditingActionTypes.RenameCurrent;
	payload: string;
}

export interface IFunctorEditingAddChildAction {
	type: typeof FunctorEditingActionTypes.AddChild;
	payload: TreePath;
}

export interface IFunctorEditingRemoveAction {
	type: typeof FunctorEditingActionTypes.Remove;
	payload: TreePath;
}

export interface IFunctorEditingSetCurrentPathAction {
	type: typeof FunctorEditingActionTypes.SetCurrentPath;
	payload: TreePath["path"] | null;
}

export interface IFunctorEditingSetFunctorsAction {
	type: typeof FunctorEditingActionTypes.SetFunctors;
	payload: IFunctorEditingState["functors"];
}

export type FunctorEditingActions =
	| IFunctorEditingChangeCurrentAspectAction
	| IFunctorEditingRemoveCurrentAspectAction
	| IFunctorEditingRenameCurrentAction
	| IFunctorEditingAddChildAction
	| IFunctorEditingRemoveAction
	| IFunctorEditingSetCurrentPathAction
	| IFunctorEditingSetFunctorsAction
	| IFunctorEditingAddCurrentAspectAction;

export const functorEditingChangeCurrentAspect = (
	payload: IFunctorEditingChangeCurrentAspectAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.ChangeCurrentAspect,
	payload,
});

export const functorEditingRemoveCurrentAspect = (
	payload: IFunctorEditingRemoveCurrentAspectAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.RemoveCurrentAspect,
	payload,
});

export const functorEditingAddCurrentAspect = (
	payload: IFunctorEditingAddCurrentAspectAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.AddCurrentAspect,
	payload,
});

export const functorEditingRenameCurrent = (
	payload: IFunctorEditingRenameCurrentAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.RenameCurrent,
	payload,
});

export const functorEditingAddChild = (
	payload: IFunctorEditingAddChildAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.AddChild,
	payload,
});

export const functorEditingRemove = (
	payload: IFunctorEditingRemoveAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.Remove,
	payload,
});

export const functorEditingSetCurrentPath = (
	payload: IFunctorEditingSetCurrentPathAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.SetCurrentPath,
	payload,
});

export const functorEditingSetFunctor = (
	payload: IFunctorEditingSetFunctorsAction["payload"]
): FunctorEditingActions => ({
	type: FunctorEditingActionTypes.SetFunctors,
	payload,
});
