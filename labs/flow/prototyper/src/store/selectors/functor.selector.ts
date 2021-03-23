import { createSelector } from "reselect";

import * as fromFeature from "../reducers";
import { reducerSelectors } from "../reducers/functor.reducer";

export const selectCurrentPath = createSelector(
	fromFeature.selectFunctorState,
	reducerSelectors.selectCurrentPath
);

export const selectFunctors = createSelector(
	fromFeature.selectFunctorState,
	reducerSelectors.selectFunctors
);
