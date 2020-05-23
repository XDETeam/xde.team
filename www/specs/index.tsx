import { FunctionComponent, ReactElement, Children, PropsWithChildren, ReactNode } from "react";

/**
 * TODO: Short statements about design:
 * - Mesh nodes are simply React elements
 * - Mesh relation are functions
 * - To add node to specification, specify(...) function is used.
 * 
 * TODO: Automatically generate h1?
 */

// TODO: Create FunctionComponent extension (interface)?
export type SpecComponent = FunctionComponent & { inbox: SpecComponent[] };

export interface ISpecElement extends ReactElement {
    inbox: FunctionComponent[];
}

export const Spec: FunctionComponent = (props) => {
    if (props.children instanceof Array) {
        props.children?.forEach((child) => console.log(child));
    }

    return <>{props.children}</>;
};

//TODO:Migrate to interface?
export const specify = (node: ReactElement): ISpecElement => {
    console.log(`Specify [${(node.type as Function).name}] for ${node.key}`);

    const result = { ...node, inbox: [] };

    // TODO:Check if exists
    specify.storage[node.key] = node;

    if (node.props.children instanceof Array) {
        node.props.children?.forEach((child) => {
            console.log(`-- ${(child.type as Function).name}`);
            //TODO:if relation
            result.inbox.push(child)
        });
    }

    return result;
};

specify.storage = {};

export interface ITranslationProps extends PropsWithChildren<{ in: ReactNode }> { }
export const Named: FunctionComponent<ITranslationProps> = (
    { in: from, children }
) => <div>Translated {from}: {children}</div>;
export const Is: FunctionComponent<{ a: ReactElement }> = (props) => <></>;

export const Russian = specify(<Spec key="russian-language"></Spec>);
export const English = specify(<Spec key="english-language"></Spec>);

export const WorkoutExcercise = specify(
    <Spec key="workout-excercise">
        <Named in={Russian}>Физическое упражнение</Named>
    </Spec>
);

export const Squat = specify(
    <Spec key="squat">
        <h1>Squat</h1>
        <Named in={English}>Squat</Named>
        <Named in={Russian}>Приседание</Named>
        <Is a={WorkoutExcercise} />
    </Spec>
);

export const dump = (element: ReactElement, level: number = 1) => {
    console.log(`${"--".repeat(level)} `, element.type);
    if (element.props.children instanceof Array) {
        element.props.children?.forEach((child) => {
            dump(child, level + 1);
        });
    }
};

console.log(`Dump Squat`);
dump(Squat);

export default specify.storage;
