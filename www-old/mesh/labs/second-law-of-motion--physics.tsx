import React, { FC } from "react";

export const SecondLawOfMotion: FC = () => {
	return <p>F = ma</p>;
};

export const SecondLawOfMotionPhysics: FC = () => {
	return (
		<>
			<SecondLawOfMotion />
			<p>TODO: как-то бы оформлять/описывать "выводы" (ниже)</p>
			<p>Разогнать тяжелее, чем поддерживать скорость</p>
		</>
	);
};

export default SecondLawOfMotionPhysics;
