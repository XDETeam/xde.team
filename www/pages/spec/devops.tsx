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
            <li>
                <Link href="/spec/open-ssh-connectivity">
                    <a>OpenSSH</a>
                </Link>
            </li>
            <li>
                <Link href="/spec/wsl-compatibility-layer">
                    <a>Windows Subsystem for Linux (WSL)</a>
                </Link>
            </li>
        </ul>
    </>
);

export default Page;
