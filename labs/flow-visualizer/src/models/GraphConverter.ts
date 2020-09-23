import { Functor, IFunctor, IFunctorExplained } from "@xde/flow-manager/.build/core/Functor";
import { GraphData, GraphLinkType, GraphNode, GraphNodeType, IGraphData } from "./GraphData";

export interface IGraphConverter {
	toGraphData(functor: IFunctor): GraphData["data"];
}

export class GraphConverter implements IGraphConverter {
	toGraphData(functor: IFunctor): GraphData["data"] {
		const explained = Functor.explain(functor);

		const data = new GraphData();
		let namespace = "";

		console.log(explained);

		this.process(explained, data);

		return data.data;
	}

	process(explanation: IFunctorExplained, data: IGraphData, parent?: GraphNode): void {
		console.log("data before", JSON.stringify(data.data, null, 2));
		console.log("explanation", JSON.stringify(explanation, null, 2));

		const explanationNodeId = parent
			? `${parent.id}.${explanation.functorName}`
			: explanation.functorName;
		const explanationNode = data.addNode({
			id: explanationNodeId,
			// name: explanationNodeId,
			type: GraphNodeType.Functor,
		});
		if (parent) {
			data.addLink({
				source: parent.id,
				target: explanationNode.id,
				type: GraphLinkType.FunctorComposition,
			});
		}

		explanation.from.forEach((from, i) => {
			if ("aspect" in from) {
				const node = data.addNode({
					id: this.getName(from.aspect, parent?.id),
					// name: this.getName(from.aspect, parentFunctorName),
					type: GraphNodeType.Aspect,
				});
				data.addLink({
					source: node.id,
					target: explanationNode.id,
					type: from.type,
				});
			} else {
				const outerNode = data.addNode({
					id: this.getName(`Group${i}`, parent?.id),
					// name: this.getName(`Group${i}`, parentFunctorName),
					type: GraphNodeType.AspectsGroup,
				});
				data.addLink({
					source: outerNode.id,
					target: explanationNode.id,
					type: from.type,
				});
				from.aspects.forEach((aspect) => {
					const node = data.addNode({
						id: this.getName(aspect, parent?.id),
						// name: this.getName(aspect, parentFunctorName),
						type: GraphNodeType.Aspect,
					});
					data.addLink({
						source: node.id,
						target: outerNode.id,
						type: from.type,
					});
				});
			}
		});

		explanation.to.forEach((to, i) => {
			if ("aspect" in to) {
				const node = data.addNode({
					id: this.getName(to.aspect, parent?.id),
					// name: this.getName(to.aspect, parentFunctorName),
					type: GraphNodeType.Aspect,
				});
				data.addLink({
					source: explanationNode.id,
					target: node.id,
					type: to.type,
				});
			} else {
				const outerNode = data.addNode({
					id: this.getName(`Group${i}`, parent?.id),
					// name: this.getName(`Group${i}`, parentFunctorName),
					type: GraphNodeType.AspectsGroup,
				});
				data.addLink({
					source: explanationNode.id,
					target: outerNode.id,
					type: to.type,
				});
				to.aspects.forEach((aspect) => {
					const node = data.addNode({
						id: this.getName(aspect, parent?.id),
						// name: this.getName(aspect, parentFunctorName),
						type: GraphNodeType.Aspect,
					});
					data.addLink({
						source: outerNode.id,
						target: node.id,
						type: to.type,
					});
				});
			}
		});

		if (explanation.children) {
			explanation.children?.forEach((child, i) => {
				this.process(child, data, explanationNode);
			});
		}
	}

	private getName(name: string, namespace?: string): string {
		return namespace ? `${namespace}.${name}` : name;
	}
}

const graphConverterInstance = new GraphConverter();
export default graphConverterInstance;
