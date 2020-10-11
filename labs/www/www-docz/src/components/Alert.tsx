import React, { FC } from "react";

const kinds = {
	info: "#5352ED",
	positive: "#2ED573",
	negative: "#FF4757",
	warning: "#FFA502"
};

export interface IAlertProps {
	kind: keyof typeof kinds;
}

export const Alert: FC<IAlertProps> = ({ children, kind, ...rest }) => (
	<div
		style={{
			padding: 20,
			borderRadius: 3,
			color: "white",
			background: kinds[kind]
		}}
		{...rest}
	>
		{children}
	</div>
);
