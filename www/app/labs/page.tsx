import { Container } from "@/components/Container";
import Link from "next/link";

const Page = () => (
    <>
        <Container>
            <h1 className="text-6xl font-black">Labs</h1>
        </Container>

        <Container>
            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">Знания</h2>

            <p>
                Инженерия знаний &mdash; фундаментальный инструмент, как навык чтения и письма,
                который будет полезен во всех областях.
            </p>

            <ul className="list-disc my-4 mx-8">
                <li><Link href="/labs/informatics" className="text-red-600">Информатика</Link></li>
                <li><Link href="/labs/xde-academy" className="text-red-600">XDE Academy</Link></li>
            </ul>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">Социальная среда</h2>

            <ul className="list-disc my-4 mx-8">
                <li><Link href="/labs/egopolis" className="text-red-600">Egopolis</Link></li>
                <li><Link href="/labs/theory-of-organization" className="text-red-600">Теория управления/организации</Link></li>
            </ul>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">Политика</h2>
            <p>
                TODO:Как компоненты социальной среды
            </p>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">Программное обеспечение</h2>

            <p className="mt-4">TODO: Code engineering</p>
            
            <ul className="list-disc my-4 mx-8">
                <li><Link href="/labs/all-as-a-code-paradigm" className="text-red-600">Парадигма All-as-a-Code</Link></li>
                <li><Link href="/labs/specs-concept" className="text-red-600">Концепция Specs</Link></li>
                <li><Link href="/labs/application-flow" className="text-red-600">Application flow</Link></li>
                <li><Link href="/labs/rust-ecosystem" className="text-red-600">Экосистема/формула Rust</Link></li>
                <li><Link href="/labs/dotnet-ecosystem" className="text-red-600">Экосистема/формула .NET</Link></li>
                <li><Link href="/labs/cx-language" className="text-red-600">Язык Cx</Link></li>
                <li><Link href="/labs/xde-app" className="text-red-600">XDE App</Link></li>
                <li><Link href="/labs/data-storage-systems" className="text-red-600">Системы хранения данных</Link></li>
            </ul>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">TODO:Story engineering</h2>

            <p>
                TODO:Сторителлинг, нарратив.
            </p>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">TODO:Civil engineering</h2>

            <h2 className="text-4xl font-extrabold mt-12 mb-4 border-b-2 border-black">TODO:Building</h2>
            <ul>
                <li>
                    TODO: <Link href="/labs/rust-ecosystem" className="text-red-600">BIM</Link> &ndash; В том числе как потенциальный компонент <Link href="/labs/xde-academy">XDE.Academy</Link>
                </li>
            </ul>
        </Container>
    </>
)

export default Page;
