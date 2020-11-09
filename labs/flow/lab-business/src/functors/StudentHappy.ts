import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	StudentTeached,
	TStudentTeached,
	StudentImpressed,
	TStudentImpressed,
	StudentHappy as StudentHappyAspect,
	TStudentHappy,
} from "../models";

export class StudentHappy extends PrimitiveFunctor<
	TStudentTeached & TStudentImpressed,
	TStudentHappy
> {
	name = "StudentHappy";
	from = [StudentTeached, StudentImpressed];
	to = [StudentHappyAspect];

	distinct() {
		return {
			[StudentHappyAspect]: 1,
		};
	}
}

const studentHappyInstance = new StudentHappy();
export default studentHappyInstance;
