import { FC, PropsWithChildren } from "react";

export type Props = {
	className?: string;
}

export const Article: FC<PropsWithChildren<Props>> = ({ className, ...children }) => (
	<article
		className="prose lg:prose-xl mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12"
		{...children}
	/>
)
