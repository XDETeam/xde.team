import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';

export const ShortName = "Labs";
export const FullName = "XDE Team Labs";

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
                        <Link href="/labs/cx-language">Язык Cx</Link>.
                    </li>
                    <li>
                        Потоко/событийно-ориентированное программирование. Flow.
                    </li>
                    <li>
                        Организаций тестов. На примере имеющихся набросков ISpecification,
                        многослойных тестов, c DI/IoC и т.п.
                    </li>
                    <li>
                        DI/IoC. Особенно интересует композиция, роутинг, подходы в разных языках,
                        пример с factorial+memoization.
                    </li>
                    <li>
                        Kubernetes formula.
                    </li>
                    <li>
                        Rust formula.
                    </li>
                    <li>
                        SOLID в базах данных. Хранимые процедуры и представления.
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default Page
