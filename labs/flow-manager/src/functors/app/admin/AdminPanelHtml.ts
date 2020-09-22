import { Functor } from "../../../core/Functor";
import { Aspect } from "../../../core/models";

export class AdminPanelHtml extends Functor {
	name = "AdminPanelHtml";
	requires = [
		{
			aspect: Aspect.HttpRouted,
			lambda: (asp: string) => asp.endsWith("/security/adminPanelRoute"),
		},
		// TODO: не сильно нравится, что нужно это повторять для каждого роута группы Secured
		{
			aspect: Aspect.AppAdminRouteAllowed,
			lambda: (allowed: boolean) => allowed === true,
		},
	];
	produces = [Aspect.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspect.GeneratedHtml]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelHtmlInstance = new AdminPanelHtml();
export default adminPanelHtmlInstance;
