const babylon = require(`@babel/parser`)
const traverse = require(`@babel/traverse`).default

async function onCreateNode({
	node,
	actions,
	loadNodeContent,
	createContentDigest
}) {
	const { createNode, createParentChildLink } = actions;
	const tsx = `tsx`;

	if (![tsx].includes(node.extension)) {
		return;
	}

	const code = await loadNodeContent(node)
	const options = {
		sourceType: `module`,
		allowImportExportEverywhere: true,
		plugins: [
			`jsx`,
			`doExpressions`,
			`objectRestSpread`,
			`classProperties`,
			`exportExtensions`,
			`asyncGenerators`,
			`functionBind`,
			`functionSent`,
			`dynamicImport`,
			`typescript`
		],
	}

	let error;
	const meshData = {
		slug: `/` + node.relativePath.slice(0, -tsx.length - 1)
	}

	if (meshData.slug.endsWith(`/index`)) {
		meshData.slug = meshData.slug.slice(0, -6);
	}

	const ast = babylon.parse(code, options)
	let level = 0;

	traverse(ast, {
		ExportNamedDeclaration(path) {
			const decls = path.node.declaration.declarations;
			if (decls) {
				decls
					.filter(ast => ast.id && ast.id.name === `Url`)
					.forEach(ast => {
						switch (ast.id.name) {
							case `Url`:
								if (ast.init.type !== `StringLiteral`) {
									throw `[${node.relativePath}]: String literal required for Url, but ${ast.init.type} found`;
								}
								meshData.slug = ast.init.value;
						}
					})
			}
		},

		enter(path) {
			// console.log(`${"".padStart(level * 2, ' ')}${path.key}: ${path.type}`);
			level++;
		},
		exit() {
			level--;
		}
	})

	exportsData = {
		...meshData,
		error: error,
	}

	const contentDigest = createContentDigest(node)
	const nodeData = {
		id: `${node.id} >>> Mesh`,
		children: [],
		parent: node.id,
		node: { ...node },
		internal: {
			contentDigest,
			type: `Mesh`,
		},
	}

	nodeData.mesh = { ...exportsData }

	if (node.internal.type === `File`) {
		nodeData.fileAbsolutePath = node.absolutePath
	}

	createNode(nodeData)
	createParentChildLink({ parent: node, child: nodeData })
}

async function createPages({ graphql, actions }) {
	const { createPage } = actions

	const result = await graphql(`
        query {
            allMesh {
                nodes {
                    id
                    mesh {
                        slug
                    }
                    node {
                        relativePath
                        absolutePath
                        name
                    }
                }
            }
        }
    `)

	result.data.allMesh.nodes.forEach(({ id, node, mesh }) => {
		createPage({
			path: `${mesh.slug}`,
			component: `${node.absolutePath}`,
			context: {

			},
		})
	});
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages
