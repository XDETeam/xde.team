export interface ICurryRoute {
	(...routes: string[]): ICurryRoute;
	separator?: string;
}

export const curryRoute: ICurryRoute = (...routes: string[]) =>
	Object.assign(curryRoute.bind(null, ...routes), {
		valueOf: () =>
			routes.reduce(
				(prev, curr, i) =>
					`${prev}${
						i === 0 && (curr.includes(".") || curr.includes("localhost"))
							? ""
							: curryRoute.separator ?? "/"
					}${curr}`,
				""
			),
	});

curryRoute.separator = "/";
