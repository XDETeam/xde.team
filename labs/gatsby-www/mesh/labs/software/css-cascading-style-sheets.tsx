import React from "react";
import { Layout } from "../../../templates/layout";

export const Css = () => (
	<Layout>
		<header>
			<h1>Cascading Style Sheets (CSS)</h1>
		</header>

		<section>
			<h2>Flex CSS</h2>

			<h3>InBox</h3>
			<ul>
				<li>
					Исследовать
					https://github.com/philipwalton/solved-by-flexbox/blob/master/demos/sticky-footer.md.
					Мы пока не поняли, как оно работает :)
				</li>
			</ul>
		</section>

		<section>
			<h2>CSS Frameworks</h2>

			<h3>InBox</h3>
			<ul>
				<li>Сравнительное исследование CSS-in-JS, CSS modules, SCSS, PostCSS и т.п.</li>
			</ul>
		</section>
	</Layout>
);

export default Css;
