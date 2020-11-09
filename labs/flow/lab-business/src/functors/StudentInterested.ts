import { PrimitiveFunctor, Some } from "@xde/flow-manager";

import {
	TMoney,
	Money,
	StudentInterested as StudentInterestedAspect,
	TStudentInterested,
	StudentImpressed,
	TStudentImpressed,
} from "../models";

export class StudentInterested extends PrimitiveFunctor<
	TMoney | TStudentImpressed,
	TStudentInterested
> {
	name = "StudentInterested";
	from = [{ aspect: [Money, StudentImpressed], lambda: Some }];
	to = [StudentInterestedAspect];

	distinct() {
		return {
			[StudentInterestedAspect]: true,
		};
	}
}

const studentInterestedInstance = new StudentInterested();
export default studentInterestedInstance;
