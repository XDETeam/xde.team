import { ISpec } from "./ISpec";

/**
 * TODO: Extends {@link ISpec | specification} with JSX element that defines its
 * {@link ISpecInstruction | instructions }.
 */
export type ISpecElement = ISpec & { element: JSX.Element };
