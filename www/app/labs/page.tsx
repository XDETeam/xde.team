import { Article } from "@/components/Article";
import Link from "next/link";
import { Labs } from "@/labs";

const Page = () => (
    <Article>
        <h1>Labs</h1>

        <ul>
            <li><Labs.Xde.Team.Link/></li>
        </ul>

        <p>TODO:Дальнейшее расположено через призму наших приоритетов</p>

        <h2>Mind/Knowledge/... Engineering</h2>

        <p>
            TODO:Раздел может объединиться с Self/Ego-engineering. &quot;Я&quot; в этом мире и
            этот мир во мне.
        </p>
        <p>
            TODO: https://www.quora.com/What-is-the-difference-between-ego-self-and-the-mind
        </p>
        <p>
            Инженерия знаний &mdash; фундаментальный инструмент, как навык чтения и письма,
            который будет полезен во всех областях.
        </p>
        <p>
            Должным образом сформированные знания могут предопределить успех во всех
            остальных областях.
        </p>

        <ul>
            <li>
                <Link href="/labs/xde-academy">XDE Academy</Link> &ndash; быть достаточно
                образованным, чтобы понимать.
            </li>
            <li><Link href="/labs/technology">Технология</Link></li>
            <li><Link href="/labs/informatics">Информатика</Link></li>
            <li>TODO:Language engineering как часть информатики</li>
        </ul>

        <h2>TODO: Ego/self engineering</h2>
        <p>
            Каждый из нас лично - это инженерный проект максимальной важности. Качество самой большой
            конструкции может стать заложником качества отдельных её элементов.
            Успехи общества &ndash; это успех каждого.
        </p>

        <h2>Социальная среда</h2>
        
        <p>TODO: Social engineering</p>
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
