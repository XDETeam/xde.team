import { SpecEntity } from "./SpecEntity";
import { ISpecElement } from "./ISpecElement";
import { IDictionary } from "./IDictionary";

/**
 * TODO: Storage for specifications. Maybe later backed by redux.
 */
export interface ISpecStorage {
    get(id: SpecEntity): ISpecElement | undefined;
    set(id: SpecEntity, spec: ISpecElement): void;
    select(): IDictionary<ISpecElement>;
}
