import {
	Functor,
	IFunctor,
	IFunctorExplained,
	AspectsTyped,
	AspectType,
} from "@xde/flow-manager/.build/core/Functor";
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

	process(
		explanation: IFunctorExplained,
		data: IGraphData,
		parent?: GraphNode,
		idx: number = 0
	): void {
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
		// if (parent) {
		// 	data.addLink({
		// 		source: parent.id,
		// 		target: explanationNode.id,
		// 		type: GraphLinkType.FunctorComposition,
		// 	});
		// }

		explanation.from.forEach((from, i) => {
			this.handleExplanation(from, data, explanationNode, `${idx}.${i}`, parent, false);
		});

		explanation.to.forEach((to, i) => {
			this.handleExplanation(to, data, explanationNode, `${idx}.${i}`, parent, true);
		});

		if (explanation.children) {
			explanation.children?.forEach((child, i) => {
				this.process(child, data, explanationNode, i);
			});
		}
	}

	private handleExplanation(
		explanation: AspectsTyped,
		data: IGraphData,
		explanationNode: GraphNode,
		i: string,
		parent?: GraphNode,
		inverse?: boolean
	) {
		if ("aspect" in explanation) {
			const node = data.addNode({
				id: this.getName(explanation.aspect, parent?.id),
				// name: this.getName(from.aspect, parentFunctorName),
				type: GraphNodeType.Aspect,
			});
			data.addLink({
				source: inverse ? explanationNode.id : node.id,
				target: inverse ? node.id : explanationNode.id,
				type: explanation.type,
			});
		} else {
			const outerNode = data.addNode({
				id: this.getName(`${inverse ? "To" : "From"}Group${i}`, parent?.id),
				// name: this.getName(`Group${i}`, parentFunctorName),
				type: GraphNodeType.AspectsGroup,
			});
			data.addLink({
				source: inverse ? explanationNode.id : outerNode.id,
				target: inverse ? outerNode.id : explanationNode.id,
				type: AspectType.Exists,
			});
			explanation.aspects.forEach((aspect, j) => {
				if (Array.isArray(aspect)) {
					const innerNode = data.addNode({
						id: this.getName(`${inverse ? "To" : "From"}Group${i}.${j}`, parent?.id),
						// name: this.getName(`Group${i}`, parentFunctorName),
						type: GraphNodeType.AspectsGroup,
					});
					data.addLink({
						source: inverse ? outerNode.id : innerNode.id,
						target: inverse ? innerNode.id : outerNode.id,
						type: explanation.type,
					});

					aspect.forEach((a) => {
						const aspectNode = data.addNode({
							id: this.getName(a, parent?.id),
							type: GraphNodeType.Aspect,
						});
						data.addLink({
							source: inverse ? innerNode.id : aspectNode,
							target: inverse ? aspectNode : innerNode.id,
							type: AspectType.Exists,
						});
					});
				} else {
					const node = data.addNode({
						id: this.getName(aspect, parent?.id),
						// name: this.getName(aspect, parentFunctorName),
						type: GraphNodeType.Aspect,
					});
					data.addLink({
						source: inverse ? outerNode.id : node.id,
						target: inverse ? node.id : outerNode.id,
						type: explanation.type,
					});
				}
			});
		}
	}

	private getName(name: string, namespace?: string): string {
		return namespace ? `${namespace}.${name}` : name;
	}
}

const graphConverterInstance = new GraphConverter();
export default graphConverterInstance;
