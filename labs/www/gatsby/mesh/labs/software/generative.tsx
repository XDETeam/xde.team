import React from "react";
import { Layout } from "../../../templates/layout";

export const Generative = () => (
	<Layout>
		<header>
			<h1>Generative</h1>
		</header>

		<h2>Use cases</h2>
		<section>
			<p>
				Сгенерировать код, который вытянет столбцы из таблицы в БД и значение каждого
				столбца вставит в отдельную переменную
			</p>
		</section>
	</Layout>
);

export default Generative;
