import { combineReducers, compose, createStore } from "redux";
import { staticReducers } from "./reducers";

const composeEnhancers =
	process.env.NODE_ENV === "development" && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				shouldHotReload: false,
		  }) || compose
		: compose;

export default createStore(combineReducers(staticReducers), composeEnhancers());
