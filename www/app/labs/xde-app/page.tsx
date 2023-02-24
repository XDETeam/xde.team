import { Article } from "@/components/Article";
import Link from "next/link";

import { Route, Labs } from "@/labs/xde/app";
import CxLang from "@/labs/software/cx-language";

const Page = () => (
    <Article>
        <h1>XDE App</h1>

        <h2>InBox</h2>

        <p>
            <Link href="https://xde.app">https://xde.app</Link>
        </p>
        <p>
            XDE App &mdash; инженерный инструмент. В некотором смысле похож на концепцию IDE
            (Integrated Development Environment).
        </p>

        <p>Экосистема:</p>
        <ul>
            <li>
                Эксперименты с реализациями в различных экосистемах (ECMA Script, .NET, Rust) с
                последующей адаптацией языка <CxLang.Link/>. Так чтобы его кодогенеративные возможности
                формировали такие же продукты.
            </li>
            <li>
                Начать можно с .NET, опираясь на следующие аргументы: языковые (C#, F#, богатые
                возможности, хорошая производительность), платформенные (Windows, MacOS, iOS, Android,
                Tizen, некоторые микропроцессоры), широкий спектр приложений (настольные, веб, мобильные),
                мета-программирование (reflection, emit, source generators), 
            </li>
        </ul>

        <h2>Labs</h2>
        <ul>
            {Labs.map(lab => <li>
                <Link href={ `/labs/${Route}/${lab.Route}` }>{ lab.Caption }</Link>
            </li>)}
        </ul>
    </Article>
)

export default Page;
