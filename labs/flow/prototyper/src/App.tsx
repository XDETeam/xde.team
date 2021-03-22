import React, { useReducer, useMemo } from "react";
import "./App.css";
import { Graph } from "@xde.labs/functor-as-graph";
// import { webapp } from "@xde.labs/flow-manager/.build/webapp";
import { getNodeAtPath } from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { FunctorDispatch } from "./store";
import {
	defaultRootFunctor,
	IFunctorExplainedWithIdAndTree,
	initialState,
	reducer,
} from "./store/reducers/functor.reducer";
import Editor from "./components/Editor";
import Tree from "./components/Tree";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	const explained = useMemo(() => {
		if (state.functors.length === 1) {
			return state.functors[0];
		} else {
			return { ...defaultRootFunctor, children: state.functors };
		}
	}, [state.functors]);

	const currentFunctor = useMemo(
		() =>
			state.currentPath
				? (getNodeAtPath({
						treeData: state.functors,
						path: state.currentPath,
						getNodeKey: ({ node }) => node.id,
				  })?.node as IFunctorExplainedWithIdAndTree | undefined)
				: null,
		[state.functors, state.currentPath]
	);

	return (
		<Container style={{ paddingTop: "1rem" }}>
			<Grid container spacing={2}>
				<FunctorDispatch.Provider value={dispatch}>
					<Grid item xs={6}>
						<Paper elevation={3}>
							<Tree functors={state.functors} />
						</Paper>
					</Grid>
					<Grid item xs={6}>
						<Paper elevation={3} style={{ padding: "1rem" }}>
							<Editor currentFunctor={currentFunctor} />
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3}>
							<Graph
								explained={explained}
								style={{
									overflow: "hidden",
									height: "400px",
								}}
							/>
						</Paper>
					</Grid>
				</FunctorDispatch.Provider>
			</Grid>
		</Container>
	);
}

export default App;
