import React, { FC, useReducer, useContext, useState, useEffect } from "react";
import { reducer, initialState } from "../store/reducers/aspect.reducer";
import {
	AspectState,
	FunctorDispatch,
	functorEditingRenameCurrent,
	functorEditingSetCurrentPath,
} from "../store";
import { FunctorProperty, IFunctorExplainedWithIdAndTree } from "../store/reducers/functor.reducer";
import TextField from "@material-ui/core/TextField";
import { useDidMount } from "../hooks/index";
import Propertier from "./Propertier";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

type EditorProps = {
	currentFunctor?: IFunctorExplainedWithIdAndTree | null;
};

const Editor: FC<EditorProps> = ({ currentFunctor }) => {
	const [aspectState, aspectDispatch] = useReducer(reducer, initialState);
	const dispatch = useContext(FunctorDispatch);
	const didMount = useDidMount();

	const [functorName, setFunctorName] = useState<string>("");

	useEffect(() => {
		if (didMount) {
			setFunctorName(currentFunctor?.functorName ?? "");
		}
	}, [didMount, currentFunctor]);

	return (
		<AspectState.Provider value={aspectState}>
			{currentFunctor && (
				<Grid container spacing={2}>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<TextField
							label="Functor name"
							variant="outlined"
							value={functorName}
							onBlur={() => {
								if (functorName) {
									dispatch && dispatch(functorEditingRenameCurrent(functorName));
								}
							}}
							onChange={(e) => {
								setFunctorName(e.target.value);
							}}
						/>
					</Grid>
					<Grid item xs={6}>
						<Propertier
							functorName={currentFunctor.functorName}
							properties={currentFunctor.from}
							property={FunctorProperty.From}
						/>
					</Grid>
					<Grid item xs={6}>
						<Propertier
							functorName={currentFunctor.functorName}
							properties={currentFunctor.to}
							property={FunctorProperty.To}
						/>
					</Grid>
					<Grid item xs={12} style={{ textAlign: "center" }}>
						<Button
							variant="contained"
							onClick={() => dispatch && dispatch(functorEditingSetCurrentPath(null))}
						>
							Finish editing
						</Button>
					</Grid>
				</Grid>
			)}
		</AspectState.Provider>
	);
};

export default Editor;
