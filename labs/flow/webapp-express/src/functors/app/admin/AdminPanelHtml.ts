import { Functor, PartialObject } from "@xde/flow-manager";

import { Aspect } from "../../../models/aspects";
import { IHttpRouted } from "../../http/HttpRouted";

export class AdminPanelHtml extends Functor<Aspect> {
	name = "AdminPanelHtml";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (
				obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: IHttpRouted }>
			) => !!obj[Aspect.HttpRouted]?.path.endsWith("/security/adminPanelRoute"),
		},
		{
			aspect: Aspect.AppAdminRouteAllowed,
			lambda: (
				obj: PartialObject<
					Aspect.AppAdminRouteAllowed,
					{ [Aspect.AppAdminRouteAllowed]?: boolean }
				>
			) => obj[Aspect.AppAdminRouteAllowed] === true,
		},
	];
	to = [Aspect.GeneratedHtml, Aspect.ResponseCode];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>secret dashboard</div>",
			[Aspect.ResponseCode]: 200,
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
