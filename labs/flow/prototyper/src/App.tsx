import React from "react";
import "./App.css";

import Editor from "./components/Editor";
import Tree from "./components/Tree";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Visualization from "./components/Visualization";

function App() {
	return (
		<Container style={{ paddingTop: "1rem" }}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Paper elevation={3}>
						<Tree />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper elevation={3} style={{ padding: "1rem" }}>
						<Editor />
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={3}>
						<Visualization />
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}

export default App;
