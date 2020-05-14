import Link from "next/link";

export const Page = () => (
    <>
        <h1>Labs</h1>

        <ul>
            <li>
                <Link href="/labs/sde.team">
                    <a>SDE.Team</a>
                </Link>
            </li>
            <li>
                <Link href="/labs/egopolis.net">
                    <a>Egopolis.net</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
