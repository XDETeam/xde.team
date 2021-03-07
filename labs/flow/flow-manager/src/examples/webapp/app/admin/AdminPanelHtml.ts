import { THttpRouted, THtmlHtmlTagged, HtmlHtmlTagged, HttpRouted } from "@xde.labs/aspects";

import { PrimitiveFunctor } from "../../../../functor/PrimitiveFunctor";
import { TAppAdminRouteAllowed, AppAdminRouteAllow } from "../../models/";

export class AdminPanelHtml extends PrimitiveFunctor<
	THttpRouted & TAppAdminRouteAllowed,
	THtmlHtmlTagged
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
	to = [HtmlHtmlTagged];

	distinct() {
		return {
			[HtmlHtmlTagged]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
