import React from "react";
import { webapp } from "@xde/flow-manager";
import { root } from "@xde/webapp-express/dist/functors/app";
// import { root } from "@xde/flow-manager/.build/lab-business";

import MeshComponent from "./components/MeshComponent";

function App() {
	return <MeshComponent functor={root} />;
}

export default App;
