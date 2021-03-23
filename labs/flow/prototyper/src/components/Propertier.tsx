import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { AspectsTyped } from "@xde.labs/flow-manager";
import React, { FC } from "react";
import Aspecter from "./Aspecter";
import { functorEditingAddCurrentAspect, FunctorProperty } from "../store";
import { useDispatch } from "react-redux";

type PropertierProps = {
	properties: AspectsTyped<any>[];
	property: FunctorProperty;
	functorName: string;
};

const Propertier: FC<PropertierProps> = ({ properties, property, functorName }) => {
	const dispatch = useDispatch();
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
