import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class Teachered extends Functor<BusinessAspect> {
	name = "Teachered";
	from = [
		BusinessAspect.TeachersSalaried,
		BusinessAspect.TeachersPepared,
		BusinessAspect.TeachersBackuped,
	];
	to = [BusinessAspect.Teachered];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.Teachered]: true,
		};
	}
}

const teacheredInstance = new Teachered();
export default teacheredInstance;
