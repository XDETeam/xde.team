import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	TCourseTopiced,
	CourseTopiced,
	TCourseProgrammed,
	CourseProgrammed,
	TCoursePrepared,
	CoursePrepared as CoursePreparedAspect,
} from "../models";

export class CoursePrepared extends PrimitiveFunctor<
	TCourseTopiced & TCourseProgrammed,
	TCoursePrepared
> {
	name = "CoursePrepared";
	from = [CourseTopiced, CourseProgrammed];
	to = [CoursePreparedAspect];

	distinct() {
		return {
			[CoursePreparedAspect]: true,
		};
	}
}

const coursePreparedInstance = new CoursePrepared();
export default coursePreparedInstance;
