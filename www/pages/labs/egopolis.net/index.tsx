import Link from "next/link";

export const Page = () => (
    <>
        <h1>Egopolis.net</h1>

        <p>
            Servers names encoding by{" "}
            <Link href="/spec/id">
                <a>ID</a>
            </Link>
            .
        </p>
    </>
);

export default Page;
