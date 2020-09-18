import { IFunctor } from "../../Functor";
import { Aspects } from "../../../aspects/index";

export class AdminPanelResponse implements IFunctor {
	requires = [
		Aspects.IsAdmin,
		{
			aspect: Aspects.Routed,
			lambda: (asp: string) => asp.startsWith("/adminPanelRoute"),
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
