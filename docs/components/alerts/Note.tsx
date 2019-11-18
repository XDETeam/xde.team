import { } from "@mdx-js/react";

export const Note: React.FC = ({ children }) => (
	<div className="py-4">
		<div className="p-2 pr-4 items-center leading-none flex lg:inline-flex" role="alert">
			<span className="flex rounded-full bg-blue-600 text-white uppercase px-4 py-2 text-xs font-bold mr-3">
				Note
			</span>
			<p className="text-left mr-2 flex-auto">{children}</p>
		</div>
	</div>
);
