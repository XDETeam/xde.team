// TODO: Installation
// https://github.com/codemirror/codemirror.next/
// node_modules/.bin/rollup codemirror.setup.js -f iife -o codemirror.bundle.js -p @rollup/plugin-node-resolve; cp .\codemirror.bundle.js c:\Projects\xde-team\src\Xde.Labs.MeshFs\wwwroot\js\codemirror6.js 
// TODO: uglifyjs

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {Compartment} from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"
import {keymap} from "@codemirror/view"
import {xml} from "@codemirror/lang-xml"

let tabSize = new Compartment

let state = EditorState.create({
	extensions: [
		basicSetup,
		keymap.of([indentWithTab]),
		tabSize.of(EditorState.tabSize.of(4)),
		xml()
	]
});

window.setupEditor = function (selector) {
	new EditorView({
		state,
		parent: document.querySelector(selector)
	});
}
