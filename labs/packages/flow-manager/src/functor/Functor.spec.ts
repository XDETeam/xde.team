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

it("should produce an error with primitive functor when there is no children functors registered", () => {
	const functor = new testPrimitiveFunctor();
	expect(() => functor.map({})).toThrow(/primitive/i);
});

it("should register functors as child to the functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	compositeFunctor.addChildren(new testPrimitiveFunctor());
	compositeFunctor.addChildren(new testPrimitiveFunctor2());
	expect(compositeFunctor.children.length).toEqual(2);
});

it("should register an array of functors as child to the functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	compositeFunctor.addChildren([new testPrimitiveFunctor(), new testPrimitiveFunctor2()]);
	expect(compositeFunctor.children.length).toEqual(2);
});

it("should prevent registration of functor with empty from", () => {
	class somePrimitiveFunctor extends Functor {
		name = "somePrimitiveFunctor";
		from = [];
		to = [Aspect.HasAuth];
	}
	const compositeFunctor = new testCompositeFunctor();

	expect(() => compositeFunctor.addChildren(new somePrimitiveFunctor())).toThrow(/never/i);
});

it("should prevent duplication of registered functors", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addChildren(primitiveFunctor);
	expect(() => compositeFunctor.addChildren(primitiveFunctor)).toThrowError(/duplicate/i);
});

it("should register replace map method", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addChildren(primitiveFunctor);
	compositeFunctor.mapReplace(primitiveFunctor, () => ({}));

	expect(primitiveFunctor.constructor.name in compositeFunctor.mapReplacements).toEqual(true);
});

it("should not allow to replace map method for unregistered child functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	const primitiveFunctor2 = new testPrimitiveFunctor2();
	compositeFunctor.addChildren(primitiveFunctor);
	expect(() => compositeFunctor.mapReplace(primitiveFunctor2, () => ({}))).toThrowError(
		/register/i
	);
});
