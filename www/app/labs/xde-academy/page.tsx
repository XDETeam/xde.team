import { Article } from "@/components/Article";
import Link from "next/link";

export const Page = () => (
    <Article>
        <h1>XDE.Academy</h1>

        <p>
            Образовательный фундамент строится с упором на
            идею <Link href="/labs/informatics">Информатики</Link>.
            А интересным практическим кандидатом для исследования является идея рассматривать
            человеческую деятельность на примере
            лаборатории <Link href="/labs/application-flow">Application flow</Link>.
        </p>

        <p>
            К образовательным технологиям можно добавить технику "Spaced repetition", которая могла бы
            реализовываться в
            рамках <Link href="/labs/xde-app">XDE.App</Link>. И само
            приложение может разрабатываться в рамках образовательного процесса.
        </p>
    </Article>
);

export default Page;
