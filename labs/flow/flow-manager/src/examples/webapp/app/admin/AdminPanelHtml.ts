import { THttpRoute, THtmlTagHtml, HtmlTagHtml, HttpRoute } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../../models/";

export class AdminPanelHtml extends PrimitiveFunctor<
	THttpRoute & TAppAdminRouteAllowed,
	THtmlTagHtml
> {
	name = "AdminPanelHtml";
	from = [
		{
			aspect: HttpRoute,
			lambda: (obj: THttpRoute) =>
				!!obj[HttpRoute]?.path.endsWith("/security/adminPanelRoute"),
		},
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === true,
		},
	];
	to = [HtmlTagHtml];

	distinct() {
		return {
			[HtmlTagHtml]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
