import { curryRoute } from "./curryRoute";

it("should be convertable to string", () => {
	expect(curryRoute("1") + "").toEqual("/1");
	expect(`${curryRoute("1")}`).toEqual("/1");
	expect(curryRoute("1").valueOf()).toEqual("/1");
});

it("should prepend route with separator", () => {
	expect(curryRoute("host") + "").toEqual("/host");
	expect(curryRoute("111") + "").toEqual("/111");
});

it("should not prepend first route with separator in case includes dot", () => {
	expect(curryRoute("www.host.tld") + "").toEqual("www.host.tld");
	expect(curryRoute("some.12") + "").toEqual("some.12");
});

it("should curry values", () => {
	const root = curryRoute("www.example.com");
	expect(root + "").toEqual("www.example.com");

	const admin = root("admin");
	expect(admin + "").toEqual("www.example.com/admin");

	const adminPage = admin("some")("path");
	expect(adminPage + "").toEqual("www.example.com/admin/some/path");
});
