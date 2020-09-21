import app404ErrorInstance from "../functors/app/App404Error";
import error404Instance from "../functors/errors/Error404";
import httpRendererInstance from "../functors/http/HttpRenderer";
import securedInstance from "../functors/http/Secured";
import { Aspect } from "./models/index";
import { Functor } from "./Functor";

class testPrimitiveFunctor extends Functor {
	requires = [Aspect.HttpRequest];
	produces = [Aspect.HasAuth];
}

class testPrimitiveFunctor2 extends Functor {
	requires = [Aspect.HasAuth];
	produces = [Aspect.AppAdminRouteAllowed];
}

class testCompositeFunctor extends Functor {
	requires = [];
	produces = [];
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

it("should prevent registration of functor with empty requires", () => {
	class somePrimitiveFunctor extends Functor {
		requires = [];
		produces = [Aspect.HasAuth];
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

it("should test if it is possible to receive some aspect", () => {
	const functor = new testCompositeFunctor();
	functor.addSubFunctors([
		securedInstance,
		app404ErrorInstance,
		error404Instance,
		httpRendererInstance,
	]);
	expect(functor.isPossible(Aspect.ResponseCode, Aspect.RenderedHtml)).toEqual(true);
	expect(functor.isPossible(Aspect.Secured, Aspect.GeneratedHtml)).toEqual(false);
	expect(functor.isPossible(Aspect.GeneratedHtml, Aspect.RenderedHtml)).toEqual(true);
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
