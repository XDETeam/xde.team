import React from "react";
import { root } from "@xde/flow-manager/.build/app";

import MeshComponent from "./components/MeshComponent";

function App() {
	return <MeshComponent functor={root} />;
}

export default App;
