import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class LessonHandled extends Functor<BusinessAspect> {
	name = "LessonHandled";
	from = [
		BusinessAspect.CoursePrepared,
		BusinessAspect.StudentsAppointed,
		BusinessAspect.Teachered,
		BusinessAspect.ClassRoomed,
	];
	to = [BusinessAspect.LessonHandled];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.LessonHandled]: true,
		};
	}
}

const lessonHandledInstance = new LessonHandled();
export default lessonHandledInstance;
