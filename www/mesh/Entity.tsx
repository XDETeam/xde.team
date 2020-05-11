export interface IEntity {
	name: string;
}

export class Entity implements IEntity {
	constructor(public name) {}

	static create(name: string): IEntity {
		return new Entity(name);
	}
}
