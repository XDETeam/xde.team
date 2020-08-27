import React from "react";
import { Layout } from "../../../templates/layout";

export const Name = () => <>x-Driven Engineering</>
export const Acronym = () => <>xDE</>
export const Logo = () => <svg>TODO:</svg>;

export const Framework = () => (
	<p>Рассмотреть в рамках новой дисциплины инжиниринга бренда.</p>
)

export const Brand = () => (
	<Layout>
		<header>
			<h1>
				<Name /> (<abbr><Acronym /></abbr>)
			</h1>
		</header>

		<section>
			<Framework />

			<p>
				"X" символизирует ген, а тот - создание (generate, generation, etc). Причём,
				символ похож и визуально на ген.
			</p>

			<p>ex- означает out of, обозначает источник.</p>

			<p>
				За X всегда будет прятаться некоторый X-фактор. Можно даже шутливо говорить, что
				этого X мы ещё до конца не знаем :) Или это переменная ("где X принадлежи..."),
				там может быть... и дальше по списку наших ценностей. Что отразиться и в форме
				написания аббревиатуры: xDE. Вместо x может быть персона.
			</p>

			<p>
				Много добротных X-терминов: excite, expression, exec, extra*, exercise, example,
				exist, exotic, expect, expense, experiment, expert, expand, extend, extremal,
				extreme, extraordinary, ...
			</p>
		</section>
	</Layout>
);

export default Brand;
