import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class CourseHandled extends Functor<BusinessAspect> {
	name = "CourseHandled";
	from = [{ aspect: BusinessAspect.LessonHandled, lambda: (amount: number) => amount > 10 }];
	to = [BusinessAspect.CourseHandled, BusinessAspect.StudentTeached];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.CourseHandled]: true,
		};
	}
}

const courseHandledInstance = new CourseHandled();
export default courseHandledInstance;
