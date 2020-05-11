import Link from "next/link";

export const Page = () => (
	<>
		<h1>Specs</h1>

		<p>
			This is a wiki-like content organization, structuring our vision of different entities
			in this world.
		</p>
		<p>
			Each spec (/spec/spec-name) contains some entity definition. Aspects
			(/spec/spec-name/aspect-name) may contain some details.
		</p>

		<ul>
			<li>
				<Link href="spec/next-js">Next.js</Link>
			</li>
			<li>
				<Link href="spec/post-css">Post CSS</Link>
			</li>
			<li>
				<Link href="spec/tab-symbol">Tab symbol</Link>
			</li>
		</ul>
	</>
);

export default Page;
