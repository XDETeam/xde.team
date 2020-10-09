import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class RefundedAmount extends Functor<BusinessAspect> {
	name = "RefundedAmount";
	from = [
		{ aspect: BusinessAspect.Money, lambda: (amount: string) => +amount > 10 },
		{ aspect: BusinessAspect.StudentHappy, lambda: (happiness: number) => happiness < 1 },
	];
	to = [BusinessAspect.RefundedAmount, BusinessAspect.Money];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.RefundedAmount]: true,
			// TODO: Calculations
			[BusinessAspect.Money]: true,
		};
	}
}

const refundedAmountInstance = new RefundedAmount();
export default refundedAmountInstance;
