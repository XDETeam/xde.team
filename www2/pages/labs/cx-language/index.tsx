import type { NextPage } from 'next'
import Head from 'next/head'
import { PageLink as SpecsLink } from "../executable-specs/index";

export const ShortName = "Cx Language";
export const FullName = "Cx Language";

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
                    Первым делом нельзя не отметить &laquo;x&raquo; в названии языка. Это продолжение общей
                    идеи инженерного подход и язык тоже условно отнесём к категории генеративных
                    (engineer &rarr; ingigno &rarr; gen &rarr; generative). TODO:Даты соответствующие
                    ссылки.
                </p>

                <p>
                    Зачастую соревнования языков начинают с программы &laquo;Hello, world!&raquo;. Которая
                    должна вывести соответствующее сообщение на экран. И если подавляющее большинство языков
                    демонстрирую более-менее идентичный синтаксис, то в случае с Cx это будет очень
                    характерный пример, поскольку выглядит код так:
                </p>

                <code className="cx">
                    Hello, world!
                </code>

                <p>
                    Задача языка Cx &mdash; это описание продукта. Если всё, что от него требуется
                    &mdash; это выдать с &laquo;конвейера&raquo; заданную фразу, то только она нам и нужна.
                    Cx не заменяет привычные языки для разработки приложений. Его задача &mdash;
                    дирижировать ими, координировать, объединять для достижения конечного результата.
                </p>

                <p>
                    NB: Можно рассмотреть как продолжение идеи <SpecsLink/>.
                </p>
            </main>
        </div>
    )
}

export default Page
