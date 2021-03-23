import React, { FC, useMemo } from "react";
import { Graph } from "@xde.labs/functor-as-graph";
// import { webapp } from "@xde.labs/flow-manager/.build/webapp";
import { useSelector } from "react-redux";
import { selectFunctors } from "../store/selectors";
import { defaultRootFunctor } from "../store";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

type VisualizationProps = {};

const Visualization: FC<VisualizationProps> = (props) => {
	const functors = useSelector(selectFunctors);

	const explained = useMemo(() => {
		if (functors.length === 1) {
			return functors[0];
		} else {
			return { ...defaultRootFunctor, children: functors };
		}
	}, [functors]);

	return (
		<Graph
			explained={explained}
			style={{
				overflow: "hidden",
				height: "400px",
			}}
		/>
	);
};

export default Visualization;
