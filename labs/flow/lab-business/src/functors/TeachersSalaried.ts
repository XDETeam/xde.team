import { PrimitiveFunctor } from "@xde/flow-manager";

import {
	TeachersSalaried as TeachersSalariedAspect,
	TMoney,
	Money,
	TTeachersSalaried,
} from "../models";

export class TeachersSalaried extends PrimitiveFunctor<TMoney, TTeachersSalaried & TMoney> {
	name = "TeachersSalaried";
	from = [{ aspect: Money, lambda: (obj: TMoney) => obj[Money] > 10 }];
	to = [TeachersSalariedAspect, Money];

	distinct(obj: TMoney) {
		return {
			...obj,
			[TeachersSalariedAspect]: true,
			[Money]: obj[Money] - 10,
		};
	}
}

const teachersSalariedInstance = new TeachersSalaried();
export default teachersSalariedInstance;
