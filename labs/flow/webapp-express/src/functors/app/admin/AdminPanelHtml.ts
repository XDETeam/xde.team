import {
	THttpStatusCode,
	HttpStatusCode,
	HttpRouted,
	THttpRouted,
	THtmlHtmlTagged,
	HtmlHtmlTagged,
} from "@xde.labs/aspects";
import { PrimitiveFunctor } from "@xde.labs/flow-manager";

import { AppAdminRouteAllow, TAppAdminRouteAllowed } from "../../../models/aspects";

export class AdminPanelHtml extends PrimitiveFunctor<
	THttpRouted & TAppAdminRouteAllowed,
	THttpStatusCode & THtmlHtmlTagged
> {
	name = "AdminPanelHtml";
	from = [
		{
			aspect: HttpRouted,
			lambda: (obj: THttpRouted) => !!obj[HttpRouted]?.path.endsWith("/security/dashboard"),
		},
		{
			aspect: AppAdminRouteAllow,
			lambda: (obj: TAppAdminRouteAllowed) => obj[AppAdminRouteAllow] === true,
		},
	];
	to = [HtmlHtmlTagged, HttpStatusCode];

	distinct() {
		return {
			[HtmlHtmlTagged]: "<div>secret dashboard</div>",
			[HttpStatusCode]: 200,
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
