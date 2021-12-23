import { ISpecStorage } from "./ISpecStorage";
import { SpecEntity } from "./SpecEntity";
import { ISpecElement } from "./ISpecElement";

/**
 * TODO: Tool to simplify specifications.
 */
export interface ISpecify {
    (id: SpecEntity, description?: JSX.Element): ISpecElement;
    storage: ISpecStorage;
}
