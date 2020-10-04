import React from "react";
import { Layout } from "../../../templates/layout";

export const DataStorage = () => (
    <Layout>
        <header>
            <h1>Typescript</h1>
        </header>

        <section>
            <h2>Типы против интерфейсов</h2>
            <p>
                Такой вариант работающий с типами, отказался делать тоже самое с интерфейсами.ё
			</p>
            <code>{`
type Languages = "en" | "ru" | "bg";
type Localized<T> = {
    [key in Languages]: FC<T>;
}
            `}</code>
        </section>
    </Layout>
);

export default DataStorage;
