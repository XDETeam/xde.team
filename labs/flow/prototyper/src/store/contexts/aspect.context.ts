import { createContext } from "react";
import { IAspectState } from "../reducers/aspect.reducer";
// import { FunctorEditingActions } from "../actions";

export const AspectState = createContext<IAspectState | null>(null);
