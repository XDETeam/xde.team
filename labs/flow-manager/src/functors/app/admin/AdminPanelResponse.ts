import { Functor } from "../../../core/Functor";
import { Aspect } from "../../../core/models";

export class AdminPanelResponse extends Functor {
	requires = [
		{
			aspect: Aspect.Routed,
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

const adminPanelResponseInstance = new AdminPanelResponse();
export default adminPanelResponseInstance;
