import { PrimitiveFunctor } from "./PrimitiveFunctor";
import { CompositeFunctor } from "./CompositeFunctor";
import { Optional, Some, Exists } from "../helpers/lambdas";

class testPrimitiveFunctor extends PrimitiveFunctor<{ HttpRequest: string }, { HasAuth: boolean }> {
	name = "testPrimitiveFunctor";
	from = ["HttpRequest" as const];
	to = ["HasAuth" as const];
	distinct = () => ({ HasAuth: true });
}

class testPrimitiveFunctor2 extends PrimitiveFunctor<
	{ HasAuth: boolean },
	{ AppAdminRouteAllowed: boolean }
> {
	name = "testPrimitiveFunctor2";
	from = ["HasAuth" as const];
	to = ["AppAdminRouteAllowed" as const];
	distinct = () => ({ AppAdminRouteAllowed: true });
}

class testCompositeFunctor extends CompositeFunctor<any, any> {
	name = "testCompositeFunctor";
	from = [];
	to = [];
}

it("should produce an error with composite functor when there is no children functors registered", async () => {
	const functor = new testCompositeFunctor();
	await expect(() => functor.map({})).rejects.toThrow(/add children/i);
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
	class somePrimitiveFunctor extends PrimitiveFunctor<any, any> {
		name = "somePrimitiveFunctor";
		from = [];
		to = ["value"];
		distinct = () => ({ value: 2 });
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

it("should register replace distinct method", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addChildren(primitiveFunctor);
	compositeFunctor.distinctReplace(primitiveFunctor, () => ({}));

	expect(primitiveFunctor.name in compositeFunctor.distinctReplacements).toEqual(true);
});

it("should not allow to replace distinct method for unregistered child functor", () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	const primitiveFunctor2 = new testPrimitiveFunctor2();
	compositeFunctor.addChildren(primitiveFunctor);
	expect(() => compositeFunctor.distinctReplace(primitiveFunctor2, () => ({}))).toThrowError(
		/register/i
	);
});

it("should handle async map", async () => {
	const compositeFunctor = new testCompositeFunctor();
	const primitiveFunctor = new testPrimitiveFunctor();
	compositeFunctor.addChildren(primitiveFunctor);
	compositeFunctor.distinctReplace(primitiveFunctor, async (obj) => {
		return {
			HasAuth: true,
			some: await Promise.resolve(1),
		};
	});
	const obj = await compositeFunctor.map({ HttpRequest: true });

	expect(obj.some).toEqual(1);
});

it("should produce an error for bad functors composition with simple to", async () => {
	class testPrimitiveFunctor3 extends PrimitiveFunctor<
		{ Some: string } & Partial<{ Other: any }>,
		{ HasAuth: boolean }
	> {
		name = "testPrimitiveFunctor3";
		from = [
			"Some" as const,
			{
				aspect: "Other" as const,
				lambda: Optional,
			},
		];
		to = ["HasAuth" as const];
		distinct = () => ({ HasAuth: true });
	}

	class testCompositeFunctor2 extends CompositeFunctor<
		{ Some: string } & Partial<{ Other: any }> & { HttpRequest: string },
		{ HasAuth: boolean }
	> {
		name = "testCompositeFunctor2";
		from = [
			"Some" as const,
			"HttpRequest" as const,
			{
				aspect: "Other" as const,
				lambda: Optional,
			},
		];
		to = ["HasAuth" as const];
	}

	const compositeFunctor = new testCompositeFunctor2();
	compositeFunctor.addChildren([new testPrimitiveFunctor(), new testPrimitiveFunctor3()]);

	await expect(
		async () => await compositeFunctor.map({ HttpRequest: "", Some: "" })
	).rejects.toThrow(/Bad functors composition/i);
});

it("should produce an error for bad functors composition with complex to", async () => {
	class testPrimitiveFunctor3 extends PrimitiveFunctor<
		{ Some: string } & Partial<{ Other: any }>,
		Partial<{ HasAuth: boolean }>
	> {
		name = "testPrimitiveFunctor3";
		from = [
			"Some" as const,
			{
				aspect: "Other" as const,
				lambda: Optional,
			},
		];
		to = [
			{
				aspect: ["HasAuth" as const],
				lambda: Optional,
			},
		];
		distinct = () => ({ HasAuth: true });
	}

	class testCompositeFunctor2 extends CompositeFunctor<
		{ Some: string } & Partial<{ Other: any }> & { HttpRequest: string },
		{ HasAuth: boolean }
	> {
		name = "testCompositeFunctor2";
		from = [
			"Some" as const,
			"HttpRequest" as const,
			{
				aspect: "Other" as const,
				lambda: Optional,
			},
		];
		to = ["HasAuth" as const];
	}

	const compositeFunctor = new testCompositeFunctor2();
	compositeFunctor.addChildren([new testPrimitiveFunctor(), new testPrimitiveFunctor3()]);

	await expect(
		async () => await compositeFunctor.map({ HttpRequest: "", Some: "" })
	).rejects.toThrow(/Bad functors composition/i);
});

it("should produce an error for functors composition with same to but different lambdas", async () => {
	class testPrimitiveFunctor33 extends PrimitiveFunctor<
		{ Some: boolean },
		Partial<{ HasAuth: boolean }>
	> {
		name = "testPrimitiveFunctor33";
		from = ["Some" as const];
		to = [
			{
				aspect: ["HasAuth" as const],
				lambda: Some,
			},
		];
		distinct = () => ({ HasAuth: undefined });
	}

	class testPrimitiveFunctor44 extends PrimitiveFunctor<{ Some: boolean }, { HasAuth: boolean }> {
		name = "testPrimitiveFunctor44";
		from = ["Some" as const];
		to = [
			{
				aspect: "HasAuth" as const,
				lambda: Exists,
			},
		];
		distinct = () => ({ HasAuth: true });
	}

	class testCompositeFunctor2 extends CompositeFunctor<
		{ Some: boolean },
		Partial<{ HasAuth: boolean }>
	> {
		name = "testCompositeFunctor2";
		from = ["Some" as const];
		to = [
			{
				aspect: ["HasAuth" as const],
				lambda: Some,
			},
		];
	}

	const compositeFunctor = new testCompositeFunctor2();
	compositeFunctor.addChildren([new testPrimitiveFunctor44(), new testPrimitiveFunctor33()]);

	await expect(async () => await compositeFunctor.map({ Some: false })).rejects.toThrow(
		/Bad functors composition/i
	);
});

it("should allow 'bad functors composition' using special flag", async () => {
	class testPrimitiveFunctor53 extends PrimitiveFunctor<
		{ Some: boolean },
		Partial<{ Some2: boolean[] }>
	> {
		name = "testPrimitiveFunctor53";
		from = ["Some" as const];
		to = [
			{
				aspect: ["Some2" as const],
				lambda: Some,
				allowSimultaneous: true,
			},
		];
		distinct = () => ({
			Some2: [false],
		});
	}

	class testPrimitiveFunctor54 extends PrimitiveFunctor<{ Some: boolean }, { Some2: boolean[] }> {
		name = "testPrimitiveFunctor54";
		from = ["Some" as const];
		to = [
			{
				aspect: "Some2" as const,
				lambda: Exists,
				// allowSimultaneous: true,
			},
		];
		distinct = () => ({
			Some2: [true],
		});
	}

	class testCompositeFunctor2 extends CompositeFunctor<{ Some: boolean }, { Some2: boolean[] }> {
		name = "testCompositeFunctor2";
		from = ["Some" as const];
		to = [
			{
				aspect: ["Some2" as const],
				lambda: Exists,
			},
		];
	}

	const compositeFunctor = new testCompositeFunctor2();
	compositeFunctor.addChildren([new testPrimitiveFunctor53(), new testPrimitiveFunctor54()]);

	expect(await compositeFunctor.map({ Some: false })).toEqual(
		expect.objectContaining({
			Some2: expect.arrayContaining([true, false]),
		})
	);
});
