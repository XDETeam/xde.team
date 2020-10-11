import Link from "next/link";

export const Page = () => (
    <>
        <h1>Labs</h1>

        <ul>
            <li>
                <Link href="/lab/egopolis-net">
                    <a>Egopolis.net</a>
                </Link>
            </li>
            <li>
                <Link href="/lab/sde-dotnet">
                    <a>SDE.NET</a>
                </Link>
            </li>
            <li>
                <Link href="/lab/sde-team">
                    <a>SDE.Team</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
