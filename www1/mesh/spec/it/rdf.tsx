import React from "react";
import { Layout } from "../../../templates/layout";

export const Url = "/ru/spec/resource-description-framework-rdf";
export const Name = "Resource Description Framework";
export const Acronym = "RDF";

export const FullName = `${Name} (${Acronym})`

export const Page = () => (
	<Layout>
		<header>
			<h1>{FullName}</h1>
		</header>
	</Layout>
);

export default Page;
