import React from "react";
import { Layout } from "../../../../templates/layout";

export const TypesTheory = () => (
	<Layout>
		<header>
			<h1>Теория типов</h1>
		</header>

		<section>
			<h2>InBox</h2>

			<ul>
				<li>
					<a href="./homotopy-type-theory">Гомотопическая теория типов</a>
				</li>
				<li>
					Интенсиональная теория типов, классическая теория типов Мартин-Лёва (MLTT).
					Языки Agda и Idris.
				</li>
				<li>Исчисление индуктивных конструкций (CIQ). Язык Coq.</li>
			</ul>
		</section>
	</Layout>
);

export default TypesTheory;
