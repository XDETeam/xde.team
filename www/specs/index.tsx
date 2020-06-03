import { FunctionComponent, PropsWithChildren, useContext } from "react";
import { ISpec, ISpecElement, specify, SpecContext } from "../lib";

/**
 * TODO: Short statements about design:
 * - Mesh nodes are simply JSX elements
 * - Mesh relation are functions
 * - To add node to specification, specify(...) function is used.
 * 
 * TODO: Automatically generate h1?
 */

export const Russian = specify("russian-language");
export const English = specify("english-language");

export interface ITermProps extends PropsWithChildren<{ in: ISpecElement }> { }
export const Term: FunctionComponent<ITermProps> = (
    { in: from, children }
) => <div>Translated from [{from.id}]: {children}</div>;

export const Is: FunctionComponent<{ a: ISpecElement }> = ({ a }) => <div>Is a [<dfn>{a.id}</dfn>]</div>;

export const WorkoutExcercise = specify(
    "workout-excercise",
    <Term in={Russian}>Физическое упражнение</Term>
);

export const TestContext = () => {
    const test = useContext<ISpec>(SpecContext);

    return (
        <div>
            In context of {test.id} with {test.instructions.length} instructions.
        </div>
    )
}

export const Squat = specify(
    "squat",
    <>
        <h1>Squat</h1>
        <Term in={English}>Squat</Term>
        <Term in={Russian}>Приседание</Term>
        <Is a={WorkoutExcercise} />
        <TestContext />
    </>
);

export * from "../specs/css/post-css"

export default specify.storage;
