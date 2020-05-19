import Link from "next/link";

export const Page = () => (
    <>
        <h1>Services</h1>

        <p>
            К сожалению, мы не можем помочь непосредственно в разработке всем
            желающим, но внести небольшой вклад, который обеспечит высокое
            качество нам вполне по силам.
        </p>

        <ul>
            <li>
                <Link href="/service/audit">
                    <a>Audit</a>
                </Link>
            </li>
            <li>
                <Link href="/service/talent-hunting">
                    <a>Talent hunting</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
