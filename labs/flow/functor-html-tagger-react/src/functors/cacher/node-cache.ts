import NodeCache from "node-cache";
import { TimePeriodSeconds } from "@xde.labs/common";

export const appCache = new NodeCache({
	// TODO:?
	stdTTL: TimePeriodSeconds.MonthMean * 6,
	useClones: false,
});
