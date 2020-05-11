import Link from "next/link";

export const Page = () => (
	<>
		<h1>Next.js</h1>
		<h2>Configuration</h2>
		<p>Configuration file is a code (compared to implementations like package.json).</p>
		<h3>Plugins composition</h3>
		<p>
			Probably plugins like next-compose-plugins are redundant and we can simply use
			Array.reduce function.
		</p>
		<pre>{`
module.exports = [
    nextConfig,
    mdx, mdx => ({...mdx, pageExtensions:
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
    }})
]
.reduce((config, plugin) => plugin(config))
    `}</pre>
		<h2>CSS</h2>
		<p>
			As I know, from 9.2 or later <Link href="/spec/post-css">Post CSS</Link> is included and
			automatically configured.
		</p>
		.
	</>
);

export default Page;
