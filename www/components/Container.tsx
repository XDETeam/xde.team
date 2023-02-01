import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export type Props = {
	className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({ className, ...children }) => (
	<div
		className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
		{...children}
	/>
)
