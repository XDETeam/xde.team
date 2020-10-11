import { SpecEntity } from "./SpecEntity";
import { ISpecInstruction } from "./ISpecInstruction";

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
