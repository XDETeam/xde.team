import { Functor } from "../../../../functor/Functor";
import { PartialObject } from "../../../../helpers/lambdas";
import { Aspect } from "../../../../models";

export class AdminPanelHtml extends Functor {
	name = "AdminPanelHtml";
	from = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (obj: PartialObject<Aspect.HttpRouted, { [Aspect.HttpRouted]?: string }>) =>
				!!obj[Aspect.HttpRouted]?.endsWith("/security/adminPanelRoute"),
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
	to = [Aspect.GeneratedHtml];

	map(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
