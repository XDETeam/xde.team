import { THttpRouted, HttpRouted } from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

export const AppAdminRoute = "AppAdminRoute" as const;
export type TAppAdminRoute = {
	[AppAdminRoute]: true;
};

export class AppAdminRouted extends PrimitiveFunctor<THttpRouted, TAppAdminRoute> {
	name = "AppAdminRouted";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.startsWith("/security/"),
		},
	];
	to = [AppAdminRoute];

	distinct() {
		return {
			[AppAdminRoute]: true as const,
		};
	}
}

const appAdminRoutedInstance = new AppAdminRouted();
export default appAdminRoutedInstance;
