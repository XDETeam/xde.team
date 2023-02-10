import { Article } from "@/components/Article";
import Link from "next/link";

import { Route, Labs } from "@/labs/xde-app";

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

        <h2>Labs</h2>
        <ul>
            {Labs.map(lab => <li>
                <Link href={ `/labs/${Route}/${lab.Route}` }>{ lab.Caption }</Link>
            </li>)}
        </ul>
    </Article>
)

export default Page;
