import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class CoursePrepared extends Functor<BusinessAspect> {
	name = "CoursePrepared";
	from = [BusinessAspect.CourseTopiced, BusinessAspect.CourseProgrammed];
	to = [BusinessAspect.CoursePrepared];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.CoursePrepared]: true,
		};
	}
}

const coursePreparedInstance = new CoursePrepared();
export default coursePreparedInstance;
