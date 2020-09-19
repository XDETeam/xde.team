import { IFunctor } from "../../../Functor";
import { Aspects } from "../../../../aspects/index";

export class AdminPanelResponse implements IFunctor {
	requires = [
		{
			aspect: Aspects.IsAdmin,
			lambda: (isAdmin: boolean) => isAdmin === true,
		},
		{
			aspect: Aspects.Routed,
			lambda: (asp: string) => asp.endsWith("/security/adminPanelRoute"),
		},
		// TODO: не сильно нравится, что нужно это повторять для каждого роута группы Secured
		{
			aspect: Aspects.AppSecuredRouteAllowed,
			lambda: (allowed: boolean) => allowed === true,
		},
	];
	produces = [Aspects.GeneratedHtml, Aspects.RouteHandled];

	move(obj: {}): {} {
		return {
			...obj,
			[Aspects.GeneratedHtml]: "<div>secret dashboard</div>",
			[Aspects.RouteHandled]: true,
		};
	}
}

const adminPanelResponseInstance = new AdminPanelResponse();
export default adminPanelResponseInstance;
