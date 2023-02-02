import { Container } from "@/components/Container";
import { Head } from "next/document";

export const ShortName = "Язык Cx";
export const FullName = ShortName;

const Page = () => (
    <>
        <Container>
            <h1 className="text-6xl font-black">{FullName}</h1>
        </Container>

        {/* TODO: <Head>
                <title>{FullName}</title>
            </Head> */}

        <Container>
            <p className="mt-4">
                Первым делом нельзя не отметить &laquo;x&raquo; в названии языка. Это продолжение общей
                идеи инженерного подход и язык тоже условно отнесём к категории генеративных
                (engineer &rarr; ingigno &rarr; gen &rarr; generative). TODO:Даты соответствующие
                ссылки.
            </p>

            <p className="mt-4">
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

            <p className="mt-4">
                TODO: Можно рассмотреть как продолжение идеи TODO:Link executable specs.
            </p>
        </Container>
    </>
)

export default Page
