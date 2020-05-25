import { FunctionComponent, PropsWithChildren, createContext, useContext } from "react";

/**
 * TODO: Short statements about design:
 * - Mesh nodes are simply React elements
 * - Mesh relation are functions
 * - To add node to specification, specify(...) function is used.
 * 
 * TODO: Automatically generate h1?
 */

/**
 * Specified entity.
 * 
 * @remarks
 * We know that something exists. But before and for its specification there is an abstraction
 * we use to identify it. For example, we can point it by finger or give it a name.
 */
export type SpecEntity = string;

/**
 * Something more or less atomic we can say about specified entity.
 */
export interface ISpecInstruction {

}

/**
 * Complete specification of the entity.
 * 
 * @remarks
 * Specification is a set of {@link ISpecInstruction | instructions} that in common constructs
 * our understanding of the specified entity.
 * 
 */
export interface ISpec {
    /**
     * Entity we specify.
     */
    id: SpecEntity;

    instructions: ISpecInstruction[];
}

export interface IDictionary<TValue> {
    [id: string]: TValue;
}

export interface ISpecifyStorage {
    get(id: SpecEntity): ISpecElement | undefined;
    set(id: SpecEntity, spec: ISpecElement);
    select(): IDictionary<ISpecElement>;
}

export class SimpleSpecifyStorage implements ISpecifyStorage {
    private _items: IDictionary<ISpecElement> = {};

    get = (id: string): ISpecElement => this._items[id];

    set = (id: string, spec: ISpecElement) => this._items[id] = spec;

    select = (): IDictionary<ISpecElement> => this._items;
}

export type ISpecElement = ISpec & { element: JSX.Element };

export interface ISpecify {
    (id: SpecEntity, description?: JSX.Element): ISpecElement;
    storage: ISpecifyStorage;
}

export const SpecContext = createContext<ISpec>({ id: "", instructions: [] });

export const specify: ISpecify = (id, element) => {
    const spec: ISpecElement = {
        id,
        instructions: [],
        element
    };

    spec.element = <SpecContext.Provider value={spec}>
        {element}
    </SpecContext.Provider>

    // TODO:Check if exists
    specify.storage.set(id, spec);

    //TODO:
    if (element) {
        if (element.props.children instanceof Array) {
            element.props.children?.forEach((child) => {
                console.log(`-- ${(child.type as Function).name}`);
                //TODO:if relation
                spec.instructions.push(child)
            });
        }
    }

    return spec;
}

specify.storage = new SimpleSpecifyStorage();

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

export default specify.storage;
