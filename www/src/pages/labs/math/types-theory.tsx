import React from "react";
import { Layout } from "../../../templates/layout";

export const TypesTheory = () => (
	<Layout>
		<header>
			<h1>Теория типов</h1>
		</header>

		<section>
			<h2>InBox</h2>

			<p>
				Гомотопическая теория типов В. Воеводского (HoTT). Язык программирования - Arend
				(JetBrains, разновидность HoTT "теория типов с интервалом").
				<a href="https://habr.com/ru/post/184716/">
					Команда математиков за полгода написала 600-страничную книгу, используя GitHub
				</a>
				,
				<a href="https://m.habr.com/ru/company/JetBrains-education/blog/469569/">
					Arend – язык с зависимыми типами, основанный на HoTT (часть 1)
				</a>
				.
			</p>
			<p>
				Интенсиональная теория типов, классическая теория типов Мартин-Лёва (MLTT). Языки
				Agda и Idris.
			</p>
			<p>Исчисление индуктивных конструкций (CIQ). Язык Coq.</p>
		</section>
	</Layout>
);

export default TypesTheory;
