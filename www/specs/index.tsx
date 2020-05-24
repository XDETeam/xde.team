import { FunctionComponent, PropsWithChildren } from "react";

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
    get(id: SpecEntity): ISpec | undefined;
    set(id: SpecEntity, spec: ISpec);
    select(): IDictionary<ISpec>;
}

export class SimpleSpecifyStorage implements ISpecifyStorage {
    private _items: IDictionary<ISpec> = {};

    get = (id: string): ISpec => this._items[id];

    set = (id: string, spec: ISpec) => this._items[id] = spec;

    select = (): IDictionary<ISpec> => this._items;
}

export type ISpecElement = JSX.Element & ISpec;

export interface ISpecify {
    (id: SpecEntity, description?: JSX.Element): ISpecElement;
    storage: ISpecifyStorage;
}

export const specify: ISpecify = (id, element) => {
    const result = {
        ...element,

        id,
        instructions: []
    };

    // TODO:Check if exists
    specify.storage.set(id, result);

    //TODO:
    if (element) {
        if (element.props.children instanceof Array) {
            element.props.children?.forEach((child) => {
                console.log(`-- ${(child.type as Function).name}`);
                //TODO:if relation
                result.instructions.push(child)
            });
        }
    }

    return result;
}

specify.storage = new SimpleSpecifyStorage();

export interface ITranslationProps extends PropsWithChildren<{ in: ISpecElement }> { }
export const Named: FunctionComponent<ITranslationProps> = (
    { in: from, children }
) => <div>Translated {from.id}: {children}</div>;
export const Is: FunctionComponent<{ a: JSX.Element }> = (props) => <></>;

export const Russian = specify("russian-language");
export const English = specify("english-language");

export const WorkoutExcercise = specify(
    "workout-excercise",
    <Named in={Russian}>Физическое упражнение</Named>
);

export const Squat = specify(
    "squat",
    <>
        <h1>Squat</h1>
        <Named in={English}>Squat</Named>
        <Named in={Russian}>Приседание</Named>
        <Is a={WorkoutExcercise} />
    </>
);

export default specify.storage.select();
