import { Article } from "@/components/Article";
import Link from "next/link";
import { Labs } from "@/labs";

const Page = () => (
    <Article>
        <h1>Labs</h1>

        <Labs.Xde.Team.FullLink/>

        <p>
            TODO:Дальнейшее расположено через призму приоритетов, описанных в <Labs.Xde.Team.Link/>?
        </p>

        <h2>Self-engineering</h2>
        <p>
            { Labs.Self.Description }
        </p>

        <ul>
            <li><Link href="/labs/xde/academy">XDE Academy</Link></li>
            <li><Labs.Self.Informatics.FullLink/></li>
            <li><Link href="/labs/technology">Технология</Link></li>
            <li>TODO:Language engineering как часть информатики</li>
            <li>TODO:Bio-engineering (здоровье)</li>
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
                Self vs Ego-engineering, бессознательное+сознательное vs сознательное
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

        <h2>Eco engineering</h2>
        <p>
            TODO:Приоритезация eco vs social?
        </p>

        <h2>Socio/Social engineering</h2>
        
        <p>TODO: Не исключено, что story telling может попасть сюда как способ коммуникаций</p>

        <ul>
            <li><Link href="/labs/egopolis">Egopolis</Link></li>
            <li><Link href="/labs/theory-of-organization">Теория управления/организации</Link></li>
        </ul>

        <h2>Политика</h2>
        <p>
            TODO:Как компоненты социальной среды
        </p>

        <h2>Программное обеспечение</h2>

        <p className="mt-4">TODO: Code/Software engineering</p>

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
            <li><Labs.Software.Specs.Link/></li>
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
