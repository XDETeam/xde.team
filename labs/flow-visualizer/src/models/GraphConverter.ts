import { IFunctor } from "@xde/flow-manager/.build/core/Functor";
import {
	ObjectFlow,
	AspectType,
	IFunctorExplained,
} from "@xde/flow-manager/.build/core/ObjectFlow";

export enum GraphNodeType {
	Functor,
}

export type GraphNode = {
	id: string;
	name: string;
	type: AspectType | GraphNodeType;
};

export type GraphLink = {
	source: GraphNode["id"] | GraphNode;
	target: GraphNode["id"] | GraphNode;
	// TODO: Add functor name
};
export interface IForceGraphData {
	nodes: GraphNode[];
	links: GraphLink[];
	// TODO: type of link: oneof, undefined
}

export interface IGraphData {
	data: IForceGraphData;
	addLink(link: GraphLink): void;
	addNode(node: GraphNode): void;
}
export class GraphData implements IGraphData {
	data: IForceGraphData = { nodes: [], links: [] };

	addLink(link: GraphLink): void {
		if (
			this.data.links.findIndex(
				(x) => x.source === link.source && x.target === link.target
			) === -1
		) {
			this.data.links.push(link);
		}
	}
	addNode(node: GraphNode): void {
		if (this.data.nodes.findIndex((x) => x.id === node.id) === -1) {
			this.data.nodes.push(node);
		}
	}
}

export interface IGraphConverter {
	toForceGraphData(functor: IFunctor): IForceGraphData;
}

export class GraphConverter implements IGraphConverter {
	toForceGraphData(functor: IFunctor): IForceGraphData {
		const explained = ObjectFlow.explainFunctor(functor);

		const data = new GraphData();
		let namespace = "";

		console.log(functor.constructor);

		this.process(explained, namespace, data);

		return data.data;
	}

	process(explanation: IFunctorExplained, namespace: string, data: IGraphData): void {
		const explanationNodeId = `${namespace}.Functor`;
		const explanationNode = {
			id: explanationNodeId,
			name: explanationNodeId,
			type: GraphNodeType.Functor,
		};
		data.addNode(explanationNode);

		explanation.from.forEach((from, i) => {
			if ("aspect" in from) {
				const node = {
					id: from.aspect,
					name: this.getName(from.aspect, from.type, namespace),
					type: from.type,
				};
				data.addNode(node);
				data.addLink({
					source: node.id,
					target: explanationNode.id,
				});
			} else {
				const outerNode = {
					id: this.getName(`${i}`, from.type, namespace),
					name: this.getName(`${i}`, from.type, namespace),
					type: from.type,
				};
				data.addNode(outerNode);
				data.addLink({
					source: outerNode.id,
					target: explanationNode.id,
				});
				from.aspects.forEach((aspect) => {
					const node = {
						id: aspect,
						name: this.getName(aspect, from.type, namespace),
						type: from.type,
					};
					data.addNode(node);
					data.addLink({
						source: node.id,
						target: outerNode.id,
					});
				});
			}
		});

		explanation.to.forEach((to, i) => {
			if ("aspect" in to) {
				const node = {
					id: to.aspect,
					name: this.getName(to.aspect, to.type, namespace),
					type: to.type,
				};
				data.addNode(node);
				data.addLink({
					source: explanationNode.id,
					target: node.id,
				});
			} else {
				const outerNode = {
					id: this.getName(`${i}`, to.type, namespace),
					name: this.getName(`${i}`, to.type, namespace),
					type: to.type,
				};
				data.addNode(outerNode);
				data.addLink({
					source: explanationNode.id,
					target: outerNode.id,
				});
				to.aspects.forEach((aspect) => {
					const node = {
						id: aspect,
						name: this.getName(aspect, to.type, namespace),
						type: to.type,
					};
					data.addNode(node);
					data.addLink({
						source: outerNode.id,
						target: node.id,
					});
				});
			}
		});

		if (explanation.children) {
			explanation.children?.forEach((child, i) => {
				this.process(child, `${explanation.functorName}${namespace}`, data);
			});
		}
	}

	private getName(name: string, type: AspectType, namespace: string): string {
		return `${namespace}.${name}.${type}`;
	}
}

const graphConverterInstance = new GraphConverter();
export default graphConverterInstance;
