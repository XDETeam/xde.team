import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	CoursePrepared,
	TCoursePrepared,
	TLessonsHandled,
	StudentsAppointed,
	TStudentsAppointed,
	LessonsHandled as LessonsHandledAspect,
	Teachered,
	TTeachered,
	ClassRoomed,
	TClassRoomed,
} from "../models";

export class LessonHandled extends PrimitiveFunctor<
	TCoursePrepared & TStudentsAppointed & TTeachered & TClassRoomed,
	TLessonsHandled
> {
	name = "LessonHandled";
	from = [CoursePrepared, StudentsAppointed, Teachered, ClassRoomed];
	to = [LessonsHandledAspect];

	distinct() {
		return {
			[LessonsHandledAspect]: 1,
		};
	}
}

const lessonHandledInstance = new LessonHandled();
export default lessonHandledInstance;
