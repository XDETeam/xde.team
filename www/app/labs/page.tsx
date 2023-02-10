import { Article } from "@/components/Article";
import Link from "next/link";
import { Labs } from "@/labs";

const Page = () => (
    <Article>
        <h1>Labs</h1>

        <h2>Знания</h2>

        <p>
            Инженерия знаний &mdash; фундаментальный инструмент, как навык чтения и письма,
            который будет полезен во всех областях.
        </p>

        <ul>
            <li><Link href="/labs/informatics">Информатика</Link></li>
            <li><Link href="/labs/xde-academy">XDE Academy</Link></li>
        </ul>

        <h2>Социальная среда</h2>

        <ul>
            <li><Link href="/labs/egopolis">Egopolis</Link></li>
            <li><Link href="/labs/theory-of-organization">Теория управления/организации</Link></li>
        </ul>

        <h2>Политика</h2>
        <p>
            TODO:Как компоненты социальной среды
        </p>

        <h2>Программное обеспечение</h2>

        <p className="mt-4">TODO: Code engineering</p>

        <ul>
            <li>
                <Link href="/labs/xde-app">XDE App</Link>
                <ul>
                    <li><Link href="/labs/xde-app/self-engineering">Self engineering</Link></li>
                    <li><Link href="/labs/xde-app/team-engineering">Team engineering</Link></li>
                    <li><Link href="/labs/xde-app/building-information-modeling">BIM (Building Information Model)</Link></li>
                </ul>
            </li>
            <li><Link href="/labs/all-as-a-code-paradigm">Парадигма All-as-a-Code</Link></li>
            <li><Link href="/labs/specs-concept">Концепция Specs</Link></li>
            <li><Link href="/labs/application-flow">Application flow</Link></li>
            <li><Link href="/labs/rust-ecosystem">Экосистема/формула Rust</Link></li>
            <li><Link href="/labs/dotnet-ecosystem">Экосистема/формула .NET</Link></li>
            <li><Link href="/labs/cx-language">Язык Cx</Link></li>
            <li><Link href="/labs/data-storage-systems">Системы хранения данных</Link></li>
        </ul>

        <h2>TODO:Story engineering</h2>

        <p>
            TODO:Сторителлинг, нарратив.
        </p>

        <h2>TODO:Civil engineering</h2>

        <h2>TODO:Building</h2>
        <ul>
            <li>
                TODO: <Link href="/labs/rust-ecosystem">BIM</Link> &ndash; В том числе как потенциальный компонент <Link href="/labs/xde-academy">XDE.Academy</Link>
            </li>
        </ul>
    </Article>
)

export default Page;
