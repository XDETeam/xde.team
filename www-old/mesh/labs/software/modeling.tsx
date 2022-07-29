import React from "react";
import { Layout } from "../../../templates/layout";
import * as RDF from "../../../mesh/spec/it/rdf";

export const Page = () => (
	<Layout>
		<header>
			<h1>Моделирование</h1>
		</header>

		<section>
			<p>Речь идёт о том, что можно назвать Information Engineering.</p>
            <ul>
                <li>
                    <a href={RDF.Url}>{RDF.FullName}</a>
                </li>
            </ul>
		</section>
	</Layout>
);

export default Page;
