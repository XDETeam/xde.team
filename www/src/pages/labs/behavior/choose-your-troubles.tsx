import React from "react";
import { PageProps } from "gatsby";

import { Layout } from "../../../templates/layout";

export const ChooseYourTroubles: PageProps = (props) => {
	return (
		<Layout>
			<header>
				<h1>Choose your troubles</h1>
			</header>

			<section>
				<p>
					Жизнь можно рассматривать как композицию из двух компонентов: проблем и работы с
					этими проблемами.
				</p>
				<p>
					К примеру, решить, делать ли домашнее задание - проблема. Допустим, мозг
					обработал ее, решив сделать. Далее новая проблема - сделать и т.д.
				</p>
				<p>
					В такой парадигме решающим может оказаться добавление еще одного компонента -
					выбора своих проблем.
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
};

export default ChooseYourTroubles;
