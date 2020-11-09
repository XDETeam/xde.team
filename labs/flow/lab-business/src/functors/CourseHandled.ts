import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	TLessonsHandled,
	TCourseHandled,
	TStudentTeached,
	LessonsHandled,
	StudentTeached,
	CourseHandled as CourseHandledAspect
} from "../models";

export class CourseHandled extends PrimitiveFunctor<
	TLessonsHandled,
	TCourseHandled & TStudentTeached
> {
	name = "CourseHandled";
	from = [{ aspect: LessonsHandled, lambda: (obj: TLessonsHandled) => obj[LessonsHandled] > 10 }];
	to = [CourseHandledAspect, StudentTeached];

	distinct() {
		return {
			[CourseHandledAspect]: true,
			[StudentTeached]: true,
		};
	}
}

const courseHandledInstance = new CourseHandled();
export default courseHandledInstance;
