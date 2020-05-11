import { IEntity, Entity, Is } from "../../mesh";
import { entity as cssPreProcessor } from "./pre-processor-css";

export const entity: IEntity = Entity.create("post-css");

export const page = () => (
	<>
		<h1>Post CSS</h1>

		<p>
			<Is subject={entity} object={cssPreProcessor} />
		</p>

		<p>
			Leader of satisfaction (91%) as of{" "}
			<a href="https://2019.stateofcss.com/technologies/pre-post-processors/">
				State of CSS 2019
			</a>
			.
		</p>
	</>
);

export default page;
