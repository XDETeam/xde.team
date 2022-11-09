import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

export const ShortName = "Projects";
export const FullName = "XDE Team Projects";

const Page: NextPage = () => {
    return (
        <div>
            <Head>
                <title>{FullName}</title>
            </Head>

            <main>
                <h1>
                    {FullName}
                </h1>

                <ul>
                    <li>
                        <Link href="/projects/server">XDE Team Server</Link>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default Page
