import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	TeachersSalaried,
	TTeachersSalaried,
	TTeachersPepared,
	TeachersPepared,
	TTeachersBackuped,
	TeachersBackuped,
	TTeachered,
	Teachered as TeacheredAspect,
} from "../models";

export class Teachered extends PrimitiveFunctor<
	TTeachersSalaried & TTeachersPepared & TTeachersBackuped,
	TTeachered
> {
	name = "Teachered";
	from = [TeachersSalaried, TeachersPepared, TeachersBackuped];
	to = [TeacheredAspect];

	distinct() {
		return {
			[TeacheredAspect]: true,
		};
	}
}

const teacheredInstance = new Teachered();
export default teacheredInstance;
