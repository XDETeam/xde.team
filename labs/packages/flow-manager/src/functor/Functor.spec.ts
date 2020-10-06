import { Aspect } from "../models";
import { Functor } from "./Functor";

class testPrimitiveFunctor extends Functor {
	name = "testPrimitiveFunctor";
	from = [Aspect.HttpRequest];
	to = [Aspect.HasAuth];
}

class testPrimitiveFunctor2 extends Functor {
	name = "testPrimitiveFunctor2";
	from = [Aspect.HasAuth];
	to = [Aspect.AppAdminRouteAllowed];
}

class testCompositeFunctor extends Functor {
	name = "testCompositeFunctor";
	from = [];
	to = [];
}

it("should produce an error with primitive functor when there is no subfunctors registered", () => {
	const functor = new testPrimitiveFunctor();
	expect(() => functor.move({})).toThrow(/primitive/i);
});

it("should register functors as child to the functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	compositeFunctor.addSubFunctors(new testPrimitiveFunctor());
	compositeFunctor.addSubFunctors(new testPrimitiveFunctor2());
	expect(compositeFunctor.subFunctors.length).toEqual(2);
});

it("should register an array of functors as child to the functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	compositeFunctor.addSubFunctors([new testPrimitiveFunctor(), new testPrimitiveFunctor2()]);
	expect(compositeFunctor.subFunctors.length).toEqual(2);
});

it("should prevent registration of functor with empty from", () => {
	class somePrimitiveFunctor extends Functor {
		name = "somePrimitiveFunctor";
		from = [];
		to = [Aspect.HasAuth];
	}
	const compositeFunctor = new testCompositeFunctor();

	expect(() => compositeFunctor.addSubFunctors(new somePrimitiveFunctor())).toThrow(/never/i);
});

it("should prevent duplication of registered functors", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addSubFunctors(primitiveFunctor);
	expect(() => compositeFunctor.addSubFunctors(primitiveFunctor)).toThrowError(/duplicate/i);
});

it("should register replace move method", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addSubFunctors(primitiveFunctor);
	compositeFunctor.replace(primitiveFunctor, () => ({}));

	expect(primitiveFunctor.constructor.name in compositeFunctor.replacements).toEqual(true);
});

it("should not allow to replace move method for unregistered subfunctor", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	const primitiveFunctor2 = new testPrimitiveFunctor2();
	compositeFunctor.addSubFunctors(primitiveFunctor);
	expect(() => compositeFunctor.replace(primitiveFunctor2, () => ({}))).toThrowError(/register/i);
});
