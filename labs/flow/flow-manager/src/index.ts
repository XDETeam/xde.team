import Debug from "debug";

export * from "./functor/models";
export * from "./functor/Functor";
export * from "./functor/CompositionFlow";
export * from "./helpers/lambdas";
export * from "./models";

// Debug.enable("*");
Debug.enable("app:CompositionFlow:short*");
// Debug.enable("app:CompositionFlow:verbose*");
