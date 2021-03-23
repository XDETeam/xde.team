import React, { FC, useState, useEffect, useMemo } from "react";
import {
	functorEditingRenameCurrent,
	functorEditingSetCurrentPath,
	FunctorProperty,
	IFunctorExplainedWithIdAndTree,
} from "../store";
import TextField from "@material-ui/core/TextField";
import { useDidMount } from "../hooks/index";
import Propertier from "./Propertier";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectFunctors } from "../store/selectors";
import { selectCurrentPath } from "../store/selectors/functor.selector";
import { getNodeAtPath } from "react-sortable-tree";

type EditorProps = {};

const Editor: FC<EditorProps> = () => {
	const functorDispatch = useDispatch();
	const didMount = useDidMount();

	const functors = useSelector(selectFunctors);
	const currentPath = useSelector(selectCurrentPath);

	const currentFunctor = useMemo(
		() =>
			currentPath
				? (getNodeAtPath({
						treeData: functors,
						path: currentPath,
						getNodeKey: ({ node }) => node.id,
				  })?.node as IFunctorExplainedWithIdAndTree | undefined)
				: null,
		[functors, currentPath]
	);

	const [functorName, setFunctorName] = useState<string>("");

	useEffect(() => {
		if (didMount) {
			setFunctorName(currentFunctor?.functorName ?? "");
		}
	}, [didMount, currentFunctor]);

	return (
		<>
			{!!currentPath && (
				<Grid container spacing={2}>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<TextField
							label="Functor name"
							variant="outlined"
							value={functorName}
							onBlur={() => {
								if (functorName) {
									functorDispatch &&
										functorDispatch(functorEditingRenameCurrent(functorName));
								}
							}}
							onChange={(e) => {
								setFunctorName(e.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Propertier
							functorName={currentFunctor?.functorName ?? ""}
							properties={currentFunctor?.from ?? []}
							property={FunctorProperty.From}
						/>
					</Grid>
					<Grid item xs={6}>
						<Propertier
							functorName={currentFunctor?.functorName ?? ""}
							properties={currentFunctor?.to ?? []}
							property={FunctorProperty.To}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<Button
							variant="contained"
							onClick={() =>
								functorDispatch &&
								functorDispatch(functorEditingSetCurrentPath(null))
							}
						>
							Finish editing
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default Editor;
