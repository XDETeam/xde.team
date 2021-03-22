import { IFunctorExplained, AspectsTyped } from "@xde.labs/flow-manager";

export const describeFromAndTo = (f: {
	from: IFunctorExplained<any, any>["from"];
	to: IFunctorExplained<any, any>["to"];
}): string => {
	const mapper = (x: AspectsTyped<any>): string =>
		`${x.type}(${Array.isArray(x.aspect) ? x.aspect.join(", ") : String(x.aspect)})`;

	const froms = f.from.map(mapper);
	const tos = f.to.map(mapper);

	return `${froms.join(" & ")} → ${tos.join(" & ")}`;
};

// TODO:
// export const describeAspectsTyped = (a: AspectsTyped<any>[]): string => {
// 	let exists: string[] = [];
// 	let specificValue: string[] = [];
// 	let undefined: string[] = [];
// 	let some: string[] = [];
// 	let optional: string[] = [];

// 	a.forEach(x => {
// 		switch(x.type) {
// 			case AspectType.Exists: {
// 				exists.push(x.aspect)
// 				break;
// 			}
// 		}
// 	})

// 	const mapper = (x: AspectsTyped<any>): string =>
// 		`${x.type}(${Array.isArray(x.aspect) ? x.aspect.join(", ") : String(x.aspect)})`;

// 	return `${a.join("\n")}`;
// };
