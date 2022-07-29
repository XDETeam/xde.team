import React from "react";
import { Layout } from "../../../templates/layout";

export const GitPractices = () => (
	<Layout>
		<header>
			<h1>Git practices</h1>
		</header>

		<section>
			<h2>TODO: Маркеры</h2>
			<p>
				Маркеры "TODO:" достаточно привычны в коде. Есть идея использовать их более широко и
				приоретизировать через формулу "TODO:N". Например, задачи которые необходимо решить
				ещё до коммита можно отмечать как TODO:0 и использовать следующий код в
			</p>

			<code>{`
#!/bin/sh

files=$(git diff --cached --name-only --diff-filter=AM)

if [ -n "$files" ]; then
	if grep -H "TODO:0" $files; then
		echo "Commits with TODO:0 requires your attention."
		exit 1
	fi
fi
			`}</code>
		</section>
	</Layout>
);

export default GitPractices;
