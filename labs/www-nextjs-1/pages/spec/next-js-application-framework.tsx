import Link from "next/link";
import Code from "../../ui/Code";

export const Page = () => (
    <>
        <h1>Next.js</h1>
        <h2>Configuration</h2>
        <p>
            Configuration file is a code (compared to implementations like
            package.json).
        </p>
        <p>
            It uses a <a>chain pattern</a> close to the one used in{" "}
            <a>Node.js</a>, <a>OWIN</a>, etc.
        </p>
        <h3>Plugins composition</h3>
        <p>
            Probably plugins like next-compose-plugins are redundant and we can
            simply use Array.reduce function.
        </p>
        <Code lang="es">
            {`module.exports = [
    nextConfig,
    mdx, mdx => ({...mdx, pageExtensions:
        pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
    }})
]
.reduce((config, plugin) => plugin(config))`}
        </Code>
        <h2>CSS</h2>
        <p>
            As I know, from 9.2 or later{" "}
            <Link href="/spec/post-css">Post CSS</Link> is included and
            automatically configured.
        </p>
        <h2>Plugins</h2>
        <p>
            Next.js plugin is mostly a configurator for{" "}
            <Link href="/spec/webpack-bundle">
                <a>Webpack</a>
            </Link>{" "}
            plugin.
        </p>

        <h2>InBox</h2>
        <p>
            Dynamic routes (/spec/[id].tsx for example) is called twice. The
            first time with empty router query and the second time its ok.
        </p>
    </>
);

export default Page;
