import React from "react";
import { Layout } from "../../templates/layout";

export const Labs = () => (
	<Layout>
		<header>
			<h1>Labs</h1>
		</header>

		<section>
			<h2>Software Engineering</h2>

			<ul>
				<li>
					<a href="/labs/software/programming">Размышления о программировании</a>
				</li>
				<li>
					<a href="/labs/software/sign-in-quest">Приключения Sign-In</a>
				</li>
				<li>
					<a href="/labs/software/data-storage">Организация хранения данных</a>
				</li>
				<li>
					<a href="/labs/software/git-practices">Практики Git</a>
				</li>
			</ul>
		</section>

		<section>
			<h2>Behavior Engineering</h2>

			<ul>
				<li>
					<a href="/labs/behavior/choose-your-troubles">Выбирайте свои проблемы</a>
				</li>
				<li>
					<a href="/labs/behavior/second-law-of-motion--behavior">
						О втором законе Ньютона
					</a>
				</li>
				<li>
					<a href="/labs/behavior/turn-off-supervisor">Отключите надзирателя</a>
				</li>
			</ul>
		</section>

		<section>
			<h2>Math</h2>

			<ul>
				<li>
					<a href="/labs/math/types-theory">Теория типов</a>
				</li>
			</ul>
		</section>

		<section>
			<h2>Education</h2>

			<ul>
				<li>
					<a href="/labs/edu/teach-by-example">Обучайте на примерах</a>
				</li>
			</ul>
		</section>
	</Layout>
);

export default Labs;
