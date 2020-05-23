import { FunctionComponent, ReactElement } from "react";

export type SpecComponent = FunctionComponent & { inbox: SpecComponent[] };

export const Spec: FunctionComponent = (props) => {
    if (props.children instanceof Array) {
        props.children?.forEach((child) => console.log(child));
    }

    return <></>;
};

export const specify = (node: ReactElement): ReactElement => {
    console.log(`Specify [${(node.type as Function).name}] for ${node.key}`);
    if (node.props.children instanceof Array) {
        node.props.children?.forEach((child) =>
            console.log(`-- ${(child.type as Function).name}`)
        );
    }

    return node;
};

export const Translation: FunctionComponent<{ from: ReactElement }> = (
    props
) => <></>;
export const Is: FunctionComponent<{ a: ReactElement }> = (props) => <></>;

export const Russian = specify(<Spec key="russian-language"></Spec>);
export const English = specify(<Spec key="english-language"></Spec>);

export const WorkoutExcercise = specify(
    <Spec key="workout-excercise">
        <Translation from={Russian}>Физическое упражнение</Translation>
    </Spec>
);

export const Squat = specify(
    <Spec key="squat">
        <Translation from={English}>Squat</Translation>
        <Translation from={Russian}>Приседание</Translation>
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

/*
export type IRelation = FunctionComponent;
export type IIncomingRelation = IRelation & { source: ISpec };
export type IOutgoingRelation = IRelation & { target: ISpec };

export interface ISpec {
    id: string;
    inbox: IIncomingRelation[];
    outbox: IOutgoingRelation[];
}

export class Spec implements ISpec {
    inbox: IIncomingRelation[];
    outbox: IOutgoingRelation[];

    constructor(public id: string) {}

    relate = (target: FunctionComponent) => {
        return this;
    };

    static storage: { [id: string]: ISpec } = {};

    static for = (id: string) => {
        const spec = new Spec(id);
        //TODO:Check uniqueness
        Spec.storage[id] = spec;
        return spec;
    };
}

export const WorkoutExcercise: ISpec = Spec.for("workout-excercise");
export const Quadriceps: ISpec = Spec.for("quadriceps-femoris");
*/

export const specs: { [id: string]: FunctionComponent } = {
    "custom-spec": () => (
        <>
            <h1>Custom specification</h1>
        </>
    ),
};

export default specs;
