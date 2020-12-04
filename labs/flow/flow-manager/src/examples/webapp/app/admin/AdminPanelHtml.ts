import { THttpRouted, TGeneratedHtml, GeneratedHtml, HttpRouted } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../../models/";

export class AdminPanelHtml extends PrimitiveFunctor<
	THttpRouted & TAppAdminRouteAllowed,
	TGeneratedHtml
> {
	name = "AdminPanelHtml";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) =>
				!!obj[HttpRouted]?.path.endsWith("/security/adminPanelRoute"),
		},
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === true,
		},
	];
	to = [GeneratedHtml];

	distinct() {
		return {
			[GeneratedHtml]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
