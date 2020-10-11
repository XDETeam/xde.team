import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class Administratored extends Functor<BusinessAspect> {
	name = "Administratored";
	from = [{ aspect: BusinessAspect.Money, lambda: (amount: string) => +amount > 10 }];
	to = [BusinessAspect.Administratored, BusinessAspect.Money];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.Administratored]: true,
			// TODO: Calculations
			[BusinessAspect.Money]: true,
		};
	}
}

const administratoredInstance = new Administratored();
export default administratoredInstance;
