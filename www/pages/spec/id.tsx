import Link from "next/link";

export const Page = () => (
    <>
        <h1>ID</h1>

        <h2>Encoding</h2>
        <p>
            ID encoding is used in{" "}
            <Link href="/lab/egopolis.net">
                <a>Egopolis.net</a>
            </Link>{" "}
            for servers identification.
        </p>
        <p>
            ID is used in this{" "}
            <Link href="/spec">
                <a>Specs</a>
            </Link>{" "}
            for specification ID.
        </p>
    </>
);

export default Page;
