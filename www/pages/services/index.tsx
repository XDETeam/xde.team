import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

export const ShortName = "Services";
export const FullName = "XDE Team Services";

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
                        <Link href="/services/team">Team management</Link>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default Page
