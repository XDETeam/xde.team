import Link from "next/link";

export const Page = () => (
    <>
        <h1>DevOps</h1>

        <ul>
            <li>
                <Link href="/spec/ansible-automation">
                    <a>Ansible</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
