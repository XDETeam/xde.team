import Link from "next/link";

export const Page = () => (
	<>
		<h1>Specs</h1>

		<p>
			This is a wiki-like content organization, structuring our vision of different entities
			in this world.
		</p>
		<p>
			Each spec (/specs/spec-name) contains some entity definition. Aspects
			(/specs/spec-name/aspect-name) may contain some details.
		</p>

		<ul>
			<li>
				<Link href="specs/next-js">Next.js</Link>
			</li>
		</ul>
	</>
);

export default Page;
