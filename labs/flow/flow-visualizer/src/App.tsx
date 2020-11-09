import React from "react";
import { webapp } from "@xde/flow-manager/.build/webapp";
import { root } from "@xde/webapp-express/dist/functors/app.js";
// import { root } from "@xde/lab-business";

import MeshComponent from "./components/MeshComponent";

function App() {
	return <MeshComponent functor={webapp} />;
}

export default App;
