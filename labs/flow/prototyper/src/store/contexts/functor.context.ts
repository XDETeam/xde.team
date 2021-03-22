import { createContext, Dispatch } from "react";
import { FunctorEditingActions } from "../actions";

export const FunctorDispatch = createContext<Dispatch<FunctorEditingActions> | null>(null);
