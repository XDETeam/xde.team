import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import { reducerSelectors } from "../reducers/aspect.reducer";

export const selectAspects = createSelector(
	fromFeature.selectAspectState,
	reducerSelectors.selectAspects
);
