import React from "react";
import { Layout } from "../../../templates/layout";

export const ChooseYourTroubles = () => (
	<Layout>
		<header>
			<h1>Choose your troubles</h1>
		</header>

		<section>
			<p>
				Жизнь можно рассматривать с точки зрения, где она состоит из двух компонентов:
				проблем и работы с этими проблемами
			</p>
			<p>
				К примеру, решить, делать ли домашнее задание - проблема. Допустим, мозг обработал
				ее, решив сделать. Далее новая проблема - сделать и т.д.
			</p>
			<p>
				В такой парадигме выгодно добавить еще один компонент в жизнь - выбор своих проблем.
			</p>
			<p>TODO: Расписать получше, что подразумевается</p>
		</section>

		<section>
			<h2>InBox</h2>

			<ul>
				<li>
					There's more to life than being happy | Emily Esfahani Smith
					https://www.youtube.com/watch?v=y9Trdafp83U
				</li>
			</ul>
		</section>
	</Layout>
);

export default ChooseYourTroubles;
