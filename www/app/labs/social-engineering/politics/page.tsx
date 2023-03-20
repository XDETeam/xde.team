import { Article } from "@/components/Article";
import Politics from "@/labs/social/politics";

const Page = () => (
    <Article>
        <h1>{Politics.Caption}</h1>

        <section>
            <h2>TODO:Черновики проектов</h2>

            <ul>
                <li>
                    WIMP (Who is mister Putin).
                    <ul>
                        <li>
                            Статистика законотворческих актов Путина, формирующих
                            &laquo;поднятие с колен&raquo;.
                        </li>
                    </ul>
                </li>
            </ul>

        </section>
    </Article>
)

export default Page;
