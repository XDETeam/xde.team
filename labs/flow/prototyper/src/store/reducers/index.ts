import aspectReducer, { IAspectState } from "./aspect.reducer";
import functorReducer, { IFunctorEditingState } from "./functor.reducer";
export type { IAspectState } from "./aspect.reducer";
export { defaultRootFunctor, FunctorProperty } from "./functor.reducer";
export type {
	IFunctorEditingState,
	IFunctorExplainedWithIdAndTree,
	IAspectChangeRequest,
} from "./functor.reducer";

// Reducers that will always be present in the application.
export const staticReducers = {
	aspect: aspectReducer,
	functor: functorReducer,
};

export type IApplicationState<T extends {} = {}> = T & {
	aspect: IAspectState;
	functor: IFunctorEditingState;
};

export const selectAspectState = (state: IApplicationState): IAspectState => state.aspect;

export const selectFunctorState = (state: IApplicationState): IFunctorEditingState => state.functor;
