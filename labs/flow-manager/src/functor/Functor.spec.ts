import { Functor } from "./Functor";
import { Aspects } from "../aspects/index";
import app404ErrorInstance from "./functors/app/App404Error";
import error404Instance from "./functors/errors/Error404";
import httpRendererInstance from "./functors/http/HttpRenderer";
import securedInstance from "./functors/http/Secured";

class testPrimitiveFunctor extends Functor {
	requires = [Aspects.HttpRequest];
	produces = [Aspects.HasAuth];
}

class testPrimitiveFunctor2 extends Functor {
	requires = [Aspects.HasAuth];
	produces = [Aspects.AppAdminRouteAllowed];
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
		produces = [Aspects.HasAuth];
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
	expect(functor.isPossible(Aspects.ResponseCode, Aspects.RenderedHtml)).toEqual(true);
	expect(functor.isPossible(Aspects.Secured, Aspects.GeneratedHtml)).toEqual(false);
	expect(functor.isPossible(Aspects.GeneratedHtml, Aspects.RenderedHtml)).toEqual(true);
});
