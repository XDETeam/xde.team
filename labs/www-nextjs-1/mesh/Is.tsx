import { FunctionComponent } from "react";
import { IEntity } from "./Entity";

export interface IsProps {
	subject: IEntity;
	object: IEntity;
}

export const Is: FunctionComponent<IsProps> = (props) => (
	<>
		<span>{props.subject.name}</span> is a <span>{props.object.name}</span>.
	</>
);
