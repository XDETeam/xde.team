import { Article } from "@/components/Article"
import Link from "next/link"
import { Labs, Db } from "@/labs"

//TODO:Experimental work with XML database
// const TestFetch = () => {

//     return (
//         <p>
//             TODO: [{ Db.xml.toString() }]
//         </p>
//     )
// }

const Page = () => (
    <Article>
        <h1>Labs</h1>

        <h2>Self-engineering</h2>
        <p>
            {Labs.Self.Description}
        </p>

        <ul>
            <li><Labs.Xde.Academy.FullLink /></li>
            <li>
                <Labs.Self.Knowledge.FullLink />
                <ul>
                    <li><Labs.Self.Informatics.FullLink /></li>
                    <li>Language engineering как часть информатики</li>
                </ul>
            </li>
            <li><Link href="/labs/technology">Технология</Link></li>
            <li><Labs.Self.Bio.FullLink /></li>
        </ul>

        <p>
            TODO:Заметки
        </p>
        <ul>
            <li>
                (vs Social) Каждый из нас лично - это инженерный проект максимальной важности.
                Качество самой большой конструкции может стать заложником качества отдельных её
                элементов. Успехи общества &ndash; это успех каждого.
            </li>
            <li>
                Mind/Knowledge enginnering. Инженерия знаний &mdash; фундаментальный инструмент,
                как навык чтения и письма, который будет полезен во всех областях.
            </li>
            <li>
                Должным образом сформированные знания могут предопределить успех во всех
                остальных областях.
            </li>
        </ul>

        <section id="social-engineering">
            <h2>Social engineering</h2>

            <ul>
                <li><Labs.Xde.Team.FullLink /></li>
                <li><Link href="/labs/egopolis">Egopolis</Link></li>
                <li><Link href="/labs/theory-of-organization">Теория управления/организации</Link></li>
                <li><Link href="/labs/social-engineering/politics">Политика</Link></li>
                <li>
                    Не исключено, что &laquo;Story telling&raquo;, нарратив может попасть сюда
                    как способ коммуникаций.
                    И распространиться, в свою очередь, на <Labs.Xde.Academy.Link />.
                </li>
            </ul>
        </section>

        <h2>Eco engineering</h2>
        <p>
            TODO:Приоритезация eco vs social?
        </p>

        <h2>Code/Software engineering</h2>

        <ul>
            <li>
                <Labs.Xde.App.FullLink />
                <ul>
                    <li><Link href="/labs/xde-app/self-engineering">Self engineering</Link></li>
                    <li><Link href="/labs/xde-app/team-engineering">Team engineering</Link></li>
                    <li><Link href="/labs/xde-app/building-information-modeling">BIM (Building Information Model)</Link></li>
                </ul>
            </li>
            <li><Link href="/labs/all-as-a-code-paradigm">Парадигма All-as-a-Code</Link></li>
            <li><Labs.Software.Specs.Link /></li>
            <li><Link href="/labs/application-flow">Application flow</Link></li>
            <li><Link href="/labs/rust-ecosystem">Экосистема/формула Rust</Link></li>
            <li><Link href="/labs/dotnet-ecosystem">Экосистема/формула .NET</Link></li>
            <li><Link href="/labs/cx-language">Язык Cx</Link></li>
            <li><Link href="/labs/data-storage-systems">Системы хранения данных</Link></li>
            <li><Link href="/labs/multilanguage-content">Multi-language content</Link></li>
        </ul>

        <h2>TODO:Story engineering</h2>

        <h2>TODO:Civil engineering</h2>

        <h2>TODO:Building</h2>
        <ul>
            <li>
                <Link href="/labs/rust-ecosystem">BIM</Link> &ndash; В том числе как потенциальный компонент <Link href="/labs/xde-academy">XDE.Academy</Link>
            </li>
        </ul>

        <h2>TODO:Mechanical/Eletrical</h2>
        <ul>
            <li>
                CNC
            </li>
        </ul>
    </Article>
)

export default Page;
