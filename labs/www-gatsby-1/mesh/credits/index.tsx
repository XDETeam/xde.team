import React from "react";
import { Layout } from "../../templates/layout";

export const Home = () => (
	<Layout>
		<header>
			<h1>Credits</h1>
		</header>

		<section>
			<h2>Icons</h2>
			<p>
				{/* TODO: /assets/noun_DNA_2335931.svg */}
				<a href="https://thenounproject.com/term/dna/2335931/">
					DNA by Travis Avery from the Noun Project
				</a>
			</p>
		</section>
	</Layout>
);

export default Home;
