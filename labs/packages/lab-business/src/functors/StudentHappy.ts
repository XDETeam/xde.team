import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class StudentHappy extends Functor<BusinessAspect> {
	name = "StudentHappy";
	from = [BusinessAspect.StudentTeached, BusinessAspect.StudentImpressed];
	to = [BusinessAspect.StudentHappy];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.StudentHappy]: true,
		};
	}
}

const studentHappyInstance = new StudentHappy();
export default studentHappyInstance;
