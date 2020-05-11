export interface IEntity {}

export class Entity implements IEntity {
	static create(name: string): IEntity {
		return new Entity();
	}
}
