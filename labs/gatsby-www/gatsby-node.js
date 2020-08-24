const _ = require(`lodash`)
const babylon = require(`@babel/parser`)
const traverse = require(`@babel/traverse`).default

async function onCreateNode({
    node,
    loadNodeContent,
    createContentDigest,
    actions
}) {
    if (![`tsx`].includes(node.extension)) {
        return;
    }

    let error;

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

    try {
        const ast = babylon.parse(code, options)

        let level = 0;
        traverse(ast, {
            enter(path) {
                // console.log(`${"".padStart(level * 2, ' ')}${path.key}: ${path.type}`);
                level++;
            },
            exit() {
                level--;
            }
            //SpecificExpression: function(path) ....
        })
    } catch (e) {
        // stick the error on the query so the user can react to an error as they see fit
        error = {
            err: true,
            code: e.code,
            message: e.message,
            stack: e.stack,
        }
    } finally {
        const { createNode, createParentChildLink } = actions;

        //TODO:0
        var someData = {
            bar: 1,
            foo: 'Two',
            items: [
                1,
                2,
                3
            ]
        }

        exportsData = {
            ...someData,
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

        nodeData.someData = { ...exportsData }

        if (node.internal.type === `File`) {
            nodeData.fileAbsolutePath = node.absolutePath
        }

        createNode(nodeData)
        createParentChildLink({ parent: node, child: nodeData })
    }
}

async function createPages({ graphql, actions }) {
    const { createPage } = actions

    const result = await graphql(`
        query {
            allMesh {
                nodes {
                    id
                    someData {
                        bar
                        foo
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

    result.data.allMesh.nodes.forEach(({ id, node, someData }) => {
        createPage({
            path: `/mesh/${node.name.toLowerCase()}`,
            component: `${node.absolutePath}`,
            context: {

            },
        })
    });
}

exports.onCreateNode = onCreateNode
exports.createPages = createPages