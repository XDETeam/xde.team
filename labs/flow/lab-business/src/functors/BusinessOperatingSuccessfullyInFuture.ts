import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	Money,
	TMoney,
	TRefundedAmount,
	RefundedAmount,
	TBusinessOperatingSuccessfullyInFuture,
	BusinessOperatingSuccessfullyInFuture as BusinessOperatingSuccessfullyInFutureAspect,
	StudentsAppointed,
	TStudentsAppointed,
	NiceClassRoomed,
	TNiceClassRoomed,
	Legal,
	TLegal,
} from "../models";

export class BusinessOperatingSuccessfullyInFuture extends PrimitiveFunctor<
	TMoney & TRefundedAmount & TStudentsAppointed & TNiceClassRoomed & TLegal,
	TBusinessOperatingSuccessfullyInFuture
> {
	name = "BusinessOperatingSuccessfullyInFuture";
	from = [
		{ aspect: Money, lambda: (obj: TMoney) => obj[Money] > -100 },
		{ aspect: RefundedAmount, lambda: (obj: TRefundedAmount) => obj[RefundedAmount] < 0.05 },
		{
			aspect: StudentsAppointed,
			lambda: (obj: TStudentsAppointed) => obj[StudentsAppointed] > 30,
		},
		NiceClassRoomed,
		Legal,
	];
	to = [BusinessOperatingSuccessfullyInFutureAspect];

	distinct() {
		return {
			[BusinessOperatingSuccessfullyInFutureAspect]: true,
		};
	}
}

const businessOperatingSuccessfullyInFutureInstance = new BusinessOperatingSuccessfullyInFuture();
export default businessOperatingSuccessfullyInFutureInstance;
