import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { AspectsTyped, AspectType } from "@xde.labs/flow-manager";
import React, { FC, useEffect, useState } from "react";
import AutocompleteController from "./AutocompleteController";
import { useDidMount } from "../hooks/index";
import { useDispatch, useSelector } from "react-redux";
import {
	functorEditingChangeCurrentAspect,
	functorEditingRemoveCurrentAspect,
	IAspectChangeRequest,
} from "../store";
import { selectAspects } from "../store/selectors";

type AspecterProps = IAspectChangeRequest & {
	canBeDeleted?: boolean;
};

const Aspecter: FC<AspecterProps> = ({ aspect, property, propertyIndex, canBeDeleted }) => {
	const dispatch = useDispatch();
	const aspects = useSelector(selectAspects);
	const didMount = useDidMount();

	const [allFields, setAllAllFields] = useState<null | AspectsTyped<any>>(null);

	const [aspectTypeValue, setAspectTypeValue] = useState<null | AspectsTyped<any>["type"]>(
		aspect.type
	);
	const [aspectValue, setAspectValue] = useState<null | AspectsTyped<any>["aspect"]>(
		aspect.aspect
	);

	useEffect(() => {
		setAspectTypeValue(aspect.type);
		setAspectValue(aspect.aspect);
	}, [didMount]);

	useEffect(() => {
		if (didMount && !!aspectTypeValue && !!aspectValue) {
			setAllAllFields({
				aspect: aspectValue,
				type: aspectTypeValue,
			});
		}
	}, [aspectTypeValue, setAllAllFields, didMount, aspectValue]);

	useEffect(() => {
		if (allFields) {
			dispatch(
				functorEditingChangeCurrentAspect({
					property,
					propertyIndex,
					aspect: allFields,
				})
			);
		}
	}, [allFields, dispatch, property, propertyIndex]);

	return (
		<Box style={{ marginBottom: "2rem" }}>
			<AutocompleteController
				setOnBlur={setAspectTypeValue}
				name="type"
				defaultValue={aspect.type}
				options={[
					AspectType.Exists,
					AspectType.Optional,
					AspectType.Some,
					AspectType.SpecificValue,
					AspectType.Undefined,
				]}
				label="Aspect type"
				style={{
					marginBottom: "0.5rem",
				}}
			/>

			{aspect.type === AspectType.Some || aspectTypeValue === AspectType.Some ? (
				<AutocompleteController
					allowCustomOption={true}
					key={1}
					setOnBlur={setAspectValue}
					style={{
						marginBottom: "0.5rem",
					}}
					name="aspect"
					defaultValue={aspect.aspect}
					multiple={true}
					options={aspects}
					label="Aspect"
				/>
			) : (
				<AutocompleteController
					allowCustomOption={true}
					key={2}
					setOnBlur={setAspectValue}
					style={{
						marginBottom: "0.5rem",
					}}
					name="aspect"
					defaultValue={aspect.aspect}
					options={aspects}
					label="Aspect"
				/>
			)}
			{canBeDeleted && (
				<IconButton
					size="small"
					style={{
						display: "block",
						margin: "0 auto",
					}}
					aria-label="delete"
					onClick={() =>
						dispatch &&
						dispatch(functorEditingRemoveCurrentAspect({ property, propertyIndex }))
					}
				>
					<DeleteIcon />
				</IconButton>
			)}
		</Box>
	);
};

export default Aspecter;
