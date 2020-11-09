import { PrimitiveFunctor } from "@xde/flow-manager";
import { Money, TMoney } from "../models";
import {
	TBusinessOperatingSuccessfullyInFuture,
	BusinessOperatingSuccessfullyInFuture,
	TBusinessOperatingSuccessfully,
	BusinessOperatingSuccessfully as BusinessOperatingSuccessfullyAspect,
} from "../models";

export class BusinessOperatingSuccessfully extends PrimitiveFunctor<
	TMoney & TBusinessOperatingSuccessfullyInFuture,
	TBusinessOperatingSuccessfully
> {
	name = "BusinessOperatingSuccessfully";
	from = [
		{ aspect: Money, lambda: (obj: TMoney) => obj[Money] > 0 },
		BusinessOperatingSuccessfullyInFuture,
	];
	to = [BusinessOperatingSuccessfullyAspect];

	distinct(obj: {}) {
		return {
			[BusinessOperatingSuccessfullyAspect]: true,
		};
	}
}

const businessOperatingSuccessfullyInstance = new BusinessOperatingSuccessfully();
export default businessOperatingSuccessfullyInstance;
