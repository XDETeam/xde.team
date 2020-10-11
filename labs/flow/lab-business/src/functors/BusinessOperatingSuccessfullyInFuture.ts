import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class BusinessOperatingSuccessfullyInFuture extends Functor<BusinessAspect> {
	name = "BusinessOperatingSuccessfullyInFuture";
	from = [
		{ aspect: BusinessAspect.Money, lambda: (amount: string) => +amount > -100 },
		{ aspect: BusinessAspect.RefundedAmount, lambda: (amount: number) => amount < 0.05 },
		{ aspect: BusinessAspect.StudentsAppointed, lambda: (students: number) => students > 30 },
		BusinessAspect.NiceClassRoomed,
		BusinessAspect.Legaled,
	];
	to = [BusinessAspect.BusinessOperatingSuccessfullyInFuture];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.BusinessOperatingSuccessfullyInFuture]: true,
		};
	}
}

const businessOperatingSuccessfullyInFutureInstance = new BusinessOperatingSuccessfullyInFuture();
export default businessOperatingSuccessfullyInFutureInstance;
