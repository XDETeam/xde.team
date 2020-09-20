import { IFunctor } from "../../../Functor";
import { Aspects } from "../../../../aspects/index";

export class AdminPanelResponse implements IFunctor {
	requires = [
		{
			aspect: Aspects.Routed,
			lambda: (asp: string) => asp.endsWith("/security/adminPanelRoute"),
		},
		// TODO: не сильно нравится, что нужно это повторять для каждого роута группы Secured
		{
			aspect: Aspects.AppAdminRouteAllowed,
			lambda: (allowed: boolean) => allowed === true,
		},
	];
	produces = [Aspects.GeneratedHtml];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.GeneratedHtml]: "<div>secret dashboard</div>",
		};
	}
}

const adminPanelResponseInstance = new AdminPanelResponse();
export default adminPanelResponseInstance;
