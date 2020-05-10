import Link from "next/link";

export const Page = () => (
	<>
		<h1>SDE.Team: Deploying...</h1>

		<ul>
			<li>
				<Link href="/spec">Specs</Link>
			</li>
			<li>
				<Link href="/app">Apps</Link>
			</li>
		</ul>
	</>
);

export default Page;
