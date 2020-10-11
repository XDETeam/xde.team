import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class StudentHandled extends Functor<BusinessAspect> {
	name = "StudentHandled";
	from = [BusinessAspect.StudentInterested, BusinessAspect.Administratored];
	to = [BusinessAspect.StudentCharged, BusinessAspect.StudentsAppointed];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.StudentCharged]: true,
			[BusinessAspect.StudentsAppointed]: true,
		};
	}
}

const studentHandledInstance = new StudentHandled();
export default studentHandledInstance;
