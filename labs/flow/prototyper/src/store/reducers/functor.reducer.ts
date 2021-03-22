import { AspectsTyped, AspectType, IFunctorExplained } from "@xde.labs/flow-manager";
import { FunctorEditingActionTypes, FunctorEditingActions } from "../actions";
import {
	TreeItem,
	TreePath,
	changeNodeAtPath,
	getNodeAtPath,
	addNodeUnderParent,
	removeNode,
} from "react-sortable-tree";

export enum FunctorProperty {
	From,
	To,
}

export interface IAspectChangeRequest {
	property: FunctorProperty;
	propertyIndex: number;
	aspect: AspectsTyped<any>;
}

export interface IFunctorExplainedWithIdAndTree {
	id: number;

	functorName: IFunctorExplained<any, any>["functorName"];
	from: IFunctorExplained<any, any>["from"];
	to: IFunctorExplained<any, any>["to"];

	title?: TreeItem["title"];
	subtitle?: TreeItem["subtitle"];
	expanded?: TreeItem["expanded"];

	children?: IFunctorExplainedWithIdAndTree[];
}

export interface IFunctorEditingState {
	functors: IFunctorExplainedWithIdAndTree[];
	currentPath: TreePath["path"] | null;
}

export const defaultRootFunctor: IFunctorExplainedWithIdAndTree = {
	id: -1,
	functorName: "root",
	from: [],
	to: [],
};

export const initialState: IFunctorEditingState = {
	functors: [
		{
			id: 1,
			functorName: "test",
			from: [
				{
					aspect: "Test",
					type: AspectType.Exists,
				},
			],
			to: [
				{
					aspect: ["Some3"],
					type: AspectType.SpecificValue,
				},
				{
					aspect: ["Test1", "Some2"],
					type: AspectType.Some,
				},
			],
			children: [
				{
					id: 2,
					functorName: "test2",
					from: [
						{
							aspect: "Test1",
							type: AspectType.Exists,
						},
					],
					to: [
						{
							aspect: "Test2",
							type: AspectType.Exists,
						},
					],
					children: [
						{
							id: 3,
							functorName: "test3",
							from: [
								{
									aspect: "Test2",
									type: AspectType.Exists,
								},
							],
							to: [
								{
									aspect: "Test3",
									type: AspectType.Exists,
								},
							],
						},
					],
				},
			],
		},
	],
	currentPath: null,
};

export function reducer(
	state: IFunctorEditingState,
	action: FunctorEditingActions
): IFunctorEditingState {
	switch (action.type) {
		case FunctorEditingActionTypes.ChangeCurrentAspect: {
			let ret = state;

			if (!!state.currentPath) {
				const node = getNodeAtPath({
					treeData: state.functors,
					path: state.currentPath,
					getNodeKey: ({ node }) => node.id,
				})?.node as IFunctorExplainedWithIdAndTree | undefined;

				if (node) {
					const newNode = { ...node };
					newNode[action.payload.property === FunctorProperty.From ? "from" : "to"][
						action.payload.propertyIndex
					] = action.payload.aspect;

					const functors: IFunctorExplainedWithIdAndTree[] = changeNodeAtPath({
						treeData: state.functors,
						path: state.currentPath,
						getNodeKey: ({ node }) => node.id,
						newNode,
					}) as IFunctorExplainedWithIdAndTree[];

					return {
						...state,
						functors,
					};
				}
			}

			return ret;
		}

		case FunctorEditingActionTypes.RemoveCurrentAspect: {
			let ret = state;

			if (!!state.currentPath) {
				const node = getNodeAtPath({
					treeData: state.functors,
					path: state.currentPath,
					getNodeKey: ({ node }) => node.id,
				})?.node as IFunctorExplainedWithIdAndTree | undefined;

				if (node) {
					const newNode = { ...node };

					if (action.payload.property === FunctorProperty.From) {
						newNode.from = [
							...newNode.from.slice(0, action.payload.propertyIndex),
							...newNode.from.slice(action.payload.propertyIndex + 1),
						];
					} else {
						newNode.to = [
							...newNode.to.slice(0, action.payload.propertyIndex),
							...newNode.to.slice(action.payload.propertyIndex + 1),
						];
					}

					const functors: IFunctorExplainedWithIdAndTree[] = changeNodeAtPath({
						treeData: state.functors,
						path: state.currentPath,
						getNodeKey: ({ node }) => node.id,
						newNode,
					}) as IFunctorExplainedWithIdAndTree[];

					return {
						...state,
						functors,
					};
				}
			}

			return ret;
		}

		case FunctorEditingActionTypes.AddCurrentAspect: {
			let ret = state;

			if (!!state.currentPath) {
				const node = getNodeAtPath({
					treeData: state.functors,
					path: state.currentPath,
					getNodeKey: ({ node }) => node.id,
				})?.node as IFunctorExplainedWithIdAndTree | undefined;

				if (node) {
					const newNode = { ...node };

					if (action.payload.property === FunctorProperty.From) {
						newNode.from = [
							...newNode.from,
							{
								aspect: "",
								type: AspectType.Optional,
							},
						];
					} else {
						newNode.to = [
							...newNode.to,
							{
								aspect: "",
								type: AspectType.Optional,
							},
						];
					}

					const functors: IFunctorExplainedWithIdAndTree[] = changeNodeAtPath({
						treeData: state.functors,
						path: state.currentPath,
						getNodeKey: ({ node }) => node.id,
						newNode,
					}) as IFunctorExplainedWithIdAndTree[];

					return {
						...state,
						functors,
					};
				}
			}

			return ret;
		}

		case FunctorEditingActionTypes.RenameCurrent: {
			let ret = state;

			if (!!state.currentPath) {
				const node = getNodeAtPath({
					treeData: state.functors,
					path: state.currentPath,
					getNodeKey: ({ node }) => node.id,
				})?.node as IFunctorExplainedWithIdAndTree | undefined;

				if (node) {
					const newNode = { ...node };
					newNode.functorName = action.payload;

					const functors: IFunctorExplainedWithIdAndTree[] = changeNodeAtPath({
						treeData: state.functors,
						path: state.currentPath,
						getNodeKey: ({ node }) => node.id,
						newNode,
					}) as IFunctorExplainedWithIdAndTree[];

					return {
						...state,
						functors,
					};
				}
			}

			return ret;
		}

		case FunctorEditingActionTypes.AddChild: {
			const id = new Date().valueOf();
			const newNode: IFunctorExplainedWithIdAndTree = {
				id,
				functorName: `${id}`,
				from: [],
				to: [],
			};

			const functors = addNodeUnderParent({
				treeData: state.functors,
				getNodeKey: ({ node }) => node.id,
				parentKey: action.payload.path[action.payload.path.length - 1],
				newNode,
			}).treeData as IFunctorExplainedWithIdAndTree[];

			return {
				...state,
				functors,
				currentPath: [...action.payload.path, id],
			};
		}
		case FunctorEditingActionTypes.Remove: {
			const removed = removeNode({
				treeData: state.functors,
				path: action.payload.path,
				getNodeKey: ({ node }) => node.id,
			});

			if (removed) {
				return {
					...state,
					functors: removed.treeData as IFunctorExplainedWithIdAndTree[],
					currentPath: null,
				};
			} else {
				return state;
			}
		}
		case FunctorEditingActionTypes.SetCurrentPath: {
			return {
				...state,
				currentPath: action.payload,
			};
		}

		case FunctorEditingActionTypes.SetFunctors: {
			return {
				...state,
				functors: action.payload,
			};
		}

		default:
			return state;
	}
}
