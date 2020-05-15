import Link from "next/link";

export const Page = () => (
    <>
        <h1>Specs</h1>

        <p>
            This is a wiki-like content organization, structuring our vision of
            different entities in this world.
        </p>
        <p>
            Each spec (/spec/spec-name) contains some entity definition. Aspects
            (/spec/spec-name/aspect-name) may contain some details.
        </p>

        <ul>
            <li>
                <Link href="/spec/id">
                    <a>ID</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/prettier-code-formatter">
                    <a>Prettier code formatter</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/tab-symbol">
                    <a>Tab symbol</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/web-development">
                    <a>Web development</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
