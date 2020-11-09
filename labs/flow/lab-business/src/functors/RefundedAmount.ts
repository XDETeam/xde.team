import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	RefundedAmount as RefundedAmountAspect,
	TMoney,
	Money,
	TRefundedAmount,
	StudentHappy,
	TStudentHappy,
} from "../models";

export class RefundedAmount extends PrimitiveFunctor<
	TMoney & TStudentHappy,
	TRefundedAmount & TMoney
> {
	name = "RefundedAmount";
	from = [
		{ aspect: Money, lambda: (obj: TMoney) => obj[Money] > 10 },
		{ aspect: StudentHappy, lambda: (obj: TStudentHappy) => obj[StudentHappy] < 1 },
	];
	to = [RefundedAmountAspect, Money];

	distinct(obj: TMoney) {
		return {
			[RefundedAmountAspect]: 0.1,
			[Money]: obj[Money] - 1,
		};
	}
}

const refundedAmountInstance = new RefundedAmount();
export default refundedAmountInstance;
