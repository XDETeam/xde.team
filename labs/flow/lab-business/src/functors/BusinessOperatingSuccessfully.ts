import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class BusinessOperatingSuccessfully extends Functor<BusinessAspect> {
	name = "BusinessOperatingSuccessfully";
	from = [
		{ aspect: BusinessAspect.Money, lambda: (amount: string) => +amount > 0 },
		BusinessAspect.BusinessOperatingSuccessfullyInFuture,
	];
	to = [BusinessAspect.BusinessOperatingSuccessfully];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.BusinessOperatingSuccessfully]: true,
		};
	}
}

const businessOperatingSuccessfullyInstance = new BusinessOperatingSuccessfully();
export default businessOperatingSuccessfullyInstance;
