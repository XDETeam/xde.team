import Link from "next/link";

export const Page = () => (
    <>
        <h1>Web development</h1>

        <h2>Scripting</h2>
        <ul>
            <li>
                <Link href="/spec/typescript-language">
                    <a>Typescript</a>
                </Link>
            </li>
        </ul>

        <h2>CSS</h2>
        <ul>
            <li>
                <Link href="/spec/normalize-css">
                    <a>Normalize.css</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/post-css">
                    <a>Post CSS</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/pre-processor-css">
                    <a>CSS Pre-processor</a>
                </Link>
            </li>
        </ul>

        <h2>Bundling</h2>
        <ul>
            <li>
                <Link href="/spec/webpack-bundle">
                    <a>Webpack</a>
                </Link>
            </li>
        </ul>

        <h2>SSR/SSG</h2>
        <ul>
            <li>
                <Link href="/spec/next-js-application-framework">
                    <a>Next.js</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
