import { Functor, Some } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class StudentInterested extends Functor<BusinessAspect> {
	name = "StudentInterested";
	from = [{ aspect: [BusinessAspect.Money, BusinessAspect.StudentImpressed], lambda: Some }];
	to = [BusinessAspect.StudentInterested];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.Administratored]: true,
			// TODO: Calculations
			[BusinessAspect.Money]: true,
		};
	}
}

const studentInterestedInstance = new StudentInterested();
export default studentInterestedInstance;
