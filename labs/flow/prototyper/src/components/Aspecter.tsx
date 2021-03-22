import React, { FC, useState, useEffect, useContext } from "react";
import { AspectType, AspectsTyped } from "@xde.labs/flow-manager";
import { useForm } from "react-hook-form";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import AutocompleteController from "../_common/AutocompleteController";

import {
	functorEditingChangeCurrentAspect,
	functorEditingRemoveCurrentAspect,
} from "../store/actions";
import { useDidMount, usePrevious } from "../hooks/index";
import { FunctorDispatch } from "../store";
import { IAspectChangeRequest } from "../store/reducers/functor.reducer";
import { AspectState } from "../store/contexts/aspect.context";

type AspecterProps = IAspectChangeRequest & {
	canBeDeleted?: boolean;
};

const Aspecter: FC<AspecterProps> = ({ aspect, property, propertyIndex, canBeDeleted }) => {
	const dispatch = useContext(FunctorDispatch);
	const state = useContext(AspectState);
	const didMount = useDidMount();

	const { register, watch, control } = useForm<AspectsTyped<any>>({
		mode: "onChange",
	});

	const watchFields = watch();
	const prevWatchFields = usePrevious(watchFields);

	const [allFields, setAllAllFields] = useState<null | AspectsTyped<any>>(null);

	useEffect(() => {
		if (
			didMount &&
			!!watchFields.aspect &&
			!!watchFields.type &&
			JSON.stringify(prevWatchFields) !== JSON.stringify(watchFields)
		) {
			setAllAllFields(watchFields);
		}
	}, [watchFields, prevWatchFields, setAllAllFields, didMount]);

	useEffect(() => {
		if (allFields) {
			dispatch &&
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
				name="type"
				defaultValue={aspect.type}
				control={control}
				options={[
					AspectType.Exists,
					AspectType.Optional,
					AspectType.Some,
					AspectType.SpecificValue,
					AspectType.Undefined,
				]}
				register={register}
				label="Aspect type"
				style={{
					marginBottom: "0.5rem",
				}}
			/>

			{aspect.type === AspectType.Some ||
			(!!watchFields && watchFields.type === AspectType.Some) ? (
				<AutocompleteController
					key={1}
					style={{
						marginBottom: "0.5rem",
					}}
					name="aspect"
					defaultValue={Array.isArray(aspect.aspect) ? aspect.aspect : [aspect.aspect]}
					control={control}
					multiple={true}
					options={state?.aspects ?? []}
					register={register}
					label="Aspect"
				/>
			) : (
				<AutocompleteController
					key={2}
					style={{
						marginBottom: "0.5rem",
					}}
					name="aspect"
					defaultValue={Array.isArray(aspect.aspect) ? aspect.aspect[0] : aspect.aspect}
					control={control}
					options={state?.aspects ?? []}
					register={register}
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
