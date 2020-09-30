import React, { FC, useMemo, useRef, useEffect } from "react";
import { forceCollide } from "d3-force";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { IFunctor } from "@xde/flow-manager/.build/core/Functor";
import graphConverterInstance from "../models/GraphConverter";
import { GraphNode, GraphNodeType } from "../models/GraphData";

type MeshComponentProps = {
	functor: IFunctor;
};

// TODO: https://github.com/vasturiano/force-graph/blob/master/example/expandable-nodes/index.html
const MeshComponent: FC<MeshComponentProps> = ({ functor }) => {
	const data = useMemo(() => graphConverterInstance.toGraphData(functor), [functor]);
	const ref = useRef<ForceGraphMethods>();

	useEffect(() => {
		// add collision force
		ref.current?.d3Force(
			"collision",
			forceCollide((node) => Math.sqrt(100 / ((node as any).level + 1)))
		);
		(ref.current?.d3Force("charge") as any).strength(-150);
	}, [ref]);
	return (
		<div>
			<details>
				<summary>Nodes</summary>
				<pre>{JSON.stringify(data.nodes, null, 2)}</pre>
			</details>
			<details>
				<summary>Edges</summary>
				<pre>{JSON.stringify(data.links, null, 2)}</pre>
			</details>
			<ForceGraph2D
				ref={ref}
				graphData={data}
				nodeLabel="name"
				// nodeThreeObjectExtend={true}
				nodeAutoColorBy="type"
				linkDirectionalArrowLength={8}
				linkCurvature={0.1}
				nodeCanvasObjectMode={() => "after"}
				onNodeClick={(node) => {
					ref.current?.centerAt(node.x, node.y, 1000);
					ref.current?.zoom(8, 2000);
				}}
				linkAutoColorBy="type"
				linkLabel="type"
				// linkDirectionalParticles={1}
				nodeCanvasObject={(node, ctx, globalScale) => {
					const label = node.id;
					const fontSize = 12 / globalScale;
					ctx.font = `${fontSize}px Sans-Serif`;
					const textWidth = ctx.measureText(`${label}`).width;
					const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

					ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
					ctx.fillRect(
						node.x! - bckgDimensions[0] / 2,
						node.y! - bckgDimensions[1] / 2,
						...(bckgDimensions as [number, number])
					);

					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					switch ((node as GraphNode).type) {
						case GraphNodeType.Aspect: {
							ctx.fillStyle = "black";
							break;
						}
						case GraphNodeType.AspectsGroup: {
							ctx.fillStyle = "grey";
							break;
						}
						case GraphNodeType.Functor: {
							ctx.fillStyle = "blue";
							break;
						}
					}

					ctx.fillText(`${label}`, node.x!, node.y!);

					return ctx;
				}}
				/** 
        linkCanvasObject={(link, ctx) => {
          const MAX_FONT_SIZE = 4;
          const LABEL_NODE_MARGIN = 1.5;

          const start = link.source;
          const end = link.target;

          // ignore unbound links
          if (typeof start !== "object" || typeof end !== "object") return;

          // calculate label positioning
          const textPos = Object.assign(
            {},
            ...["x", "y"].map((c) => ({
              [c]:
                (start as any)[c] + ((end as any)[c] - (start as any)[c]) / 2, // calc middle point
            }))
          );

          const relLink = { x: end.x! - start.x!, y: end.y! - start.y! };

          const maxTextLength =
            Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) -
            LABEL_NODE_MARGIN * 2;

          let textAngle = Math.atan2(relLink.y, relLink.x);
          // maintain label vertical orientation for legibility
          if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
          if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

          const label = `${link.source.id} > ${link.target.id}`;

          // estimate fontSize to fit in link length
          ctx.font = "1px Sans-Serif";
          const fontSize = Math.min(
            MAX_FONT_SIZE,
            maxTextLength / ctx.measureText(label).width
          );
          ctx.font = `${fontSize}px Sans-Serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(
            (n) => n + fontSize * 0.2
          ); // some padding

          // draw text label (with background rect)
          ctx.save();
          ctx.translate(textPos.x, textPos.y);
          ctx.rotate(textAngle);

          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fillRect(
            -bckgDimensions[0] / 2,
            -bckgDimensions[1] / 2,
            ...(bckgDimensions as [number, number])
          );

          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "darkgrey";
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }}*/
			/>
		</div>
	);
};

export default MeshComponent;
