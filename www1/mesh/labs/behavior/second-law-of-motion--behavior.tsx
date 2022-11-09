import React, { FC } from "react";

import { Layout } from "../../../templates/layout";
import { SecondLawOfMotion } from "../second-law-of-motion--physics";

export const SecondLawOfMotionBehavior: FC = () => {
	return (
		<Layout>
			<header>
				<h1>Second law of motion</h1>
			</header>

			<section>
				<SecondLawOfMotion />
				<p>Внедрять новую программу поведения тяжело, но поддерживать ее легче.</p>
				<p>
					К примеру, не давать прокрастинации (TODO: ссылка на term прокрастинация)
					проявляться - вначале тяжело, но просто поддерживать эту программу после
					"разгона" легче.
				</p>
				<p>
					Большинство людей инертны - и ими движут "черные лебеди", которые и
					"разгоняют"/"тормозят" (читай развивают/изменяют) те или иные программы их
					поведения. Потому что так легче. TODO: ссылка на программу, цель которой -
					экономить нашу Е.
				</p>
			</section>
		</Layout>
	);
};

export default SecondLawOfMotionBehavior;
