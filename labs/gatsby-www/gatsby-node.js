const _ = require(`lodash`)
const babylon = require(`@babel/parser`)
const traverse = require(`@babel/traverse`).default

async function onCreateNode({
    node,
    loadNodeContent,
    createContentDigest,
    actions
}) {
    console.log("Node", node.name);

    if (!['Workout', 'Squat'].includes(node.name)) {
        return;
    }

    let error;

    console.log(`Mesh for`, node);

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
                console.log(`${"".padStart(level * 2, ' ')}${path.key}: ${path.type}`);
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
            id: `${node.id} >>> Spec`,
            children: [],
            parent: node.id,
            node: { ...node },
            internal: {
                contentDigest,
                type: `Spec`,
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

exports.onCreateNode = onCreateNode