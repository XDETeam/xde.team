import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	TStudentInterested,
	TAdministratored,
	StudentInterested,
	Administratored,
	StudentCharged,
	TStudentCharged,
	StudentsAppointed,
	TStudentsAppointed,
} from "../models";

export class StudentHandled extends PrimitiveFunctor<
	TStudentInterested & TAdministratored,
	TStudentsAppointed & TStudentCharged
> {
	name = "StudentHandled";
	from = [StudentInterested, Administratored];
	to = [StudentCharged, StudentsAppointed];

	distinct() {
		return {
			[StudentCharged]: true,
			[StudentsAppointed]: 10,
		};
	}
}

const studentHandledInstance = new StudentHandled();
export default studentHandledInstance;
