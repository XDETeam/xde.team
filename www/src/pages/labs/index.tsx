import React from "react";
import { Layout } from "../../templates/layout";

export const Labs = () => (
	<Layout>
		<header>
			<h1>Labs</h1>
		</header>

		<section>
			<h2>Software Engineering</h2>

			<ul>
				<li>
					<a href="/labs/software/programming">Размышления о программировании</a>
				</li>
				<li>
					<a href="/labs/software/sign-in-quest">Приключения Sign-In</a>
				</li>
			</ul>
		</section>
	</Layout>
);

export default Labs;
