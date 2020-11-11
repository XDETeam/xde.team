import {
	THttpStatusCode,
	HttpStatusCode,
	HttpRouted,
	THttpRouted,
	TGeneratedHtml,
	GeneratedHtml,
} from "@xde/aspects";
import { PrimitiveFunctor } from "@xde/flow-manager";

import { AppAdminRouteAllow, TAppAdminRouteAllowed } from "../../../models/aspects";

export class AdminPanelHtml extends PrimitiveFunctor<
	THttpRouted & TAppAdminRouteAllowed,
	THttpStatusCode & TGeneratedHtml
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
	to = [GeneratedHtml, HttpStatusCode];

	distinct() {
		return {
			[GeneratedHtml]: "<div>secret dashboard</div>",
			[HttpStatusCode]: 200,
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
