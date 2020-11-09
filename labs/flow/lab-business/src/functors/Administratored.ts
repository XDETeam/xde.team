import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	Money,
	TMoney,
	Administratored as AdministratoredAspect,
	TAdministratored,
} from "../models";

export class Administratored extends PrimitiveFunctor<TMoney, TMoney & TAdministratored> {
	name = "Administratored";
	from = [{ aspect: Money, lambda: (obj: TMoney) => obj[Money] > 10 }];
	to = [AdministratoredAspect, Money];

	distinct(obj: TMoney) {
		return {
			[AdministratoredAspect]: true,
			[Money]: obj[Money] - 10,
		};
	}
}

const administratoredInstance = new Administratored();
export default administratoredInstance;
