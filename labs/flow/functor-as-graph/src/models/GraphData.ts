import { AspectType } from "@xde.labs/flow-manager";

export enum GraphNodeType {
	Functor = "Functor",
	Aspect = "Aspect",
	AspectsGroup = "AspectsGroup",
}

export enum GraphLinkType {
	FunctorComposition = "FunctorComposition",
}

export type GraphNode = {
	id: string;
	// name: string;
	type: GraphNodeType;
};

export type GraphLink = {
	source: GraphNode["id"] | GraphNode;
	target: GraphNode["id"] | GraphNode;
	type: AspectType | GraphLinkType;
};
export interface IForceGraphData {
	nodes: GraphNode[];
	links: GraphLink[];
}

export interface IGraphData {
	data: IForceGraphData;
	addLink(link: GraphLink): GraphLink;
	addNode(node: GraphNode): GraphNode;
}

export class GraphData implements IGraphData {
	data: IForceGraphData = { nodes: [], links: [] };

	addNode(node: GraphNode): GraphNode {
		const idx = this.data.nodes.findIndex((x) => x.id === node.id);
		if (idx === -1) {
			this.data.nodes.push(node);
			return node;
		} else {
			return this.data.nodes[idx];
		}
	}

	addLink(link: GraphLink): GraphLink {
		const idx = this.data.links.findIndex(
			(x) => x.source === link.source && x.target === link.target && x.type === link.type
		);
		if (idx === -1) {
			this.data.links.push(link);
			return link;
		} else {
			return this.data.links[idx];
		}
	}
}
