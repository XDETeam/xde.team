import type { NextPage } from 'next'
import Head from 'next/head'

export const ShortName = "Team Server";
export const FullName = "XDE Team Server";

const Page: NextPage = () => {
    return (
        <div>
            <Head>
                <title>{FullName}</title>
            </Head>

            <main>
                <h1>
                    {FullName}
                </h1>

                <h2>Предыстория</h2>
                <p>
                    TODO:Какая проблема решается?
                </p>

                <h2>Vision</h2>
                <p>
                    {ShortName} призван служить (serve) команде. С фунциональной точки зрения это как
                    член команды с определёнными полномочиями (TODO: возможно провести ребрендинг
                    на XDE Team Mate, XDE Mate Server).
                </p>
                <p>
                    Команда может начаться с одного человека. Вторым здесь с некоторой степенью
                    допущения становится {FullName}.
                </p>

                <h2>Архитектура</h2>
                <p>
                    Децентрализованная. Каждое рабочее место может выполнять функцию сервера
                    самостоятельно. Но они могут и объединяться.
                </p>
                <p>
                    Каждый сервер, практически как и член команды, может декларировать себя как
                    хорошего исполнителя определённых ролей.
                </p>
                <p>
                    Интерфейсы пользовательского взаимодействия не должны быть ограничены каким-то
                    одним вариантом. Допустимо использование CLI, Shell (e.g. netsh), messengers (bots),
                    TUI, Web UI, WebDAV и любые другие. Для этого должен быть механизм абстракций,
                    позволяющий определить структуру коммуникаций. Например, контекст (задаваемый
                    командами в CLI, маршрутом в REST API и т.п.).
                </p>

                <h2>Инструменты</h2>

                <h3>Знания</h3>
                <p>
                    Знания являются основой для качественной коммуникации в команде. Например,
                    предметный словарь. Поскольку {ShortName} рассматривается как помощник,
                    немаловажными становятся релевантные этому инструменты. Например, флеш-карты
                    для помощи в закреплении знаний.
                </p>

                <h2>FAQ</h2>
                <p>
                    TODO: Почему не управление проектами или продуктами? Команда может создавать
                    множество продуктов, проектов или не создавать вовсе.
                </p>
            </main>
        </div>
    )
}

export default Page
