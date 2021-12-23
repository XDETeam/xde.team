import { IEntity, Entity, Is } from "../../mesh";
import { entity as cssPreProcessor } from "../../pages/spec/pre-processor-css";
import { specify } from "../../lib";

export const entity: IEntity = Entity.create("post-css");

export const PostCss = specify(
	"post-css",
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
