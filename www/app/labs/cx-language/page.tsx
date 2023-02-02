import { Article } from "@/components/Article";

export const ShortName = "Язык Cx";
export const FullName = ShortName;

const Page = () => (
    <Article>
            <h1>{FullName}</h1>

        {/* TODO: <Head>
                <title>{FullName}</title>
            </Head> */}

            <p>
                Первым делом нельзя не отметить &laquo;x&raquo; в названии языка. Это продолжение общей
                идеи инженерного подхода и язык тоже условно отнесём к категории генеративных
                (engineer &rarr; ingigno &rarr; gen &rarr; generative). TODO:Даты соответствующие
                ссылки.
            </p>

            <p>
                Зачастую соревнования языков начинают с программы &laquo;Hello, world!&raquo;. Которая
                должна вывести соответствующее сообщение на экран. И если подавляющее большинство языков
                демонстрирую более-менее идентичный синтаксис, то в случае с Cx это будет очень
                характерный пример, поскольку выглядит код так:
            </p>

            <code className="m-8 p-8 bg-slate-200" style={{ display: "block" }}>
                Hello, world!
            </code>

            <p>
                Задача языка Cx &mdash; это описание продукта. Если всё, что от него требуется
                &mdash; это выдать с &laquo;конвейера&raquo; заданную фразу, то только она нам и нужна.
                Cx не заменяет привычные языки для разработки приложений. Его задача &mdash;
                дирижировать ими, координировать, объединять для достижения конечного результата.
            </p>

            <p>
                TODO: Можно рассмотреть как продолжение идеи TODO:Link executable specs.
            </p>
    </Article>
)

export default Page
