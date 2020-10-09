import { Functor } from "@xde/flow-manager";
import { BusinessAspect } from "./model";

export class TeachersSalaried extends Functor<BusinessAspect> {
	name = "TeachersSalaried";
	from = [{ aspect: BusinessAspect.Money, lambda: (amount: string) => +amount > 10 }];
	to = [BusinessAspect.TeachersSalaried, BusinessAspect.Money];

	map(obj: {}): {} {
		return {
			...obj,
			[BusinessAspect.TeachersSalaried]: true,
			// TODO: Calculations
			[BusinessAspect.Money]: true,
		};
	}
}

const teachersSalariedInstance = new TeachersSalaried();
export default teachersSalariedInstance;
