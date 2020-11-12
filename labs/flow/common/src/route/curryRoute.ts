export interface ICurryRoute {
	(...routes: string[]): ICurryRoute;
	separator?: string;
}

export const curryRoute: ICurryRoute = (...routes: string[]) =>
	Object.assign(curryRoute.bind(null, ...routes), {
		valueOf: () => {
			const separator = curryRoute.separator ?? "/";
			return routes.reduce((prev, curr, i) => {
				const shouldSkipSeparator =
					(i === 0 && (curr.includes(".") || curr.includes("localhost"))) ||
					prev[prev.length - 1] === separator ||
					curr[0] === separator;

				return `${prev}${shouldSkipSeparator ? "" : separator}${curr}`;
			}, "");
		},
	});

curryRoute.separator = "/";
