import React, { FC, useContext } from "react";
import { AspectsTyped } from "@xde.labs/flow-manager";
import { FunctorProperty } from "../store/reducers/functor.reducer";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { FunctorDispatch, functorEditingAddCurrentAspect } from "../store";
import Aspecter from "./Aspecter";

type PropertierProps = {
	properties: AspectsTyped<any>[];
	property: FunctorProperty;
	functorName: string;
};

const Propertier: FC<PropertierProps> = ({ properties, property, functorName }) => {
	const dispatch = useContext(FunctorDispatch);
	return (
		<>
			{properties.map((x, i) => (
				<Aspecter
					key={`${functorName}.${property}.${
						Array.isArray(x.aspect) ? x.aspect.join() : String(x.aspect)
					}`}
					property={property}
					propertyIndex={i}
					aspect={x}
					canBeDeleted={properties.length > 1}
				/>
			))}
			<IconButton
				aria-label="add child"
				style={{
					display: "block",
					margin: "0 auto",
				}}
				onClick={() =>
					dispatch &&
					dispatch(
						functorEditingAddCurrentAspect({
							property,
						})
					)
				}
			>
				<AddIcon />
			</IconButton>
		</>
	);
};

export default Propertier;
