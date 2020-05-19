import Link from "next/link";

export const Page = () => (
    <>
        <h1>SDE.Team</h1>

        <ul>
            <li>
                <Link href="/vision">Vision</Link>
            </li>
            <li>
                <Link href="/spec">Specs</Link>
            </li>
            <li>
                <Link href="/labs">Labs</Link>
            </li>
            <li>
                <Link href="/service">Services</Link>
            </li>
        </ul>
    </>
);

export default Page;
