import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

export const ShortName = "Specs";
export const FullName = "Executable Specifications";
export const PageLink = () => <Link href="/labs/executable-specs">{FullName}</Link>

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

                <p>
                    TODO:Как развитие идеи All-as-a-Code. Возможно, конвертация в неё.
                </p>
            </main>
        </div>
    )
}

export default Page
