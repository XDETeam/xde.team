// TODO: Installation
// https://github.com/codemirror/codemirror.next/
// node_modules/.bin/rollup codemirror.setup.js -f iife -o codemirror.bundle.js -p @rollup/plugin-node-resolve; cp .\codemirror.bundle.js c:\Projects\xde-team\src\Xde.Labs.MeshFs\wwwroot\js\codemirror6.js 
// TODO: uglifyjs

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {Compartment} from "@codemirror/state"
import {indentWithTab} from "@codemirror/commands"
import {keymap} from "@codemirror/view"
import {xml} from "@codemirror/lang-xml"
import {autocompletion} from "@codemirror/autocomplete"

let tabSize = new Compartment

const helpKeymap = [{
	key: "F1",
	run(view) {
		view.dispatch({
			effects: toggleHelp.of(!view.state.field(helpPanelState))
		})
	 
		return true
	}
}]

let state = EditorState.create({
	extensions: [
		basicSetup,
		xml(),
		autocompletion(),
		keymap.of([indentWithTab]),
		//keymap.of(helpKeymap),
		tabSize.of(EditorState.tabSize.of(8))
	],
	doc: `<flow>
	<in>Hello, world!</in>
</flow>`
});

window.setupEditor = function (selector) {
	new EditorView({
		state,
		parent: document.querySelector(selector)
	});
}

window.getEditor = function() {
	return state;
}

window.getEditorContent = function() {
	return state.doc.toString();
}
