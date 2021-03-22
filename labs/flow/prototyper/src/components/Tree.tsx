import React, { FC, useContext } from "react";
import SortableTree from "react-sortable-tree";
import {
	FunctorDispatch,
	functorEditingAddChild,
	functorEditingRemove,
	functorEditingSetCurrentPath,
	functorEditingSetFunctor,
} from "../store";
import { IFunctorExplainedWithIdAndTree } from "../store/reducers/functor.reducer";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { describeFromAndTo } from "../_common";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tree: {
			"& .rst__node": {
				height: "78px !important",
			},
			"& .rst__rowLabel": {
				maxWidth: "450px",
				overflow: "hidden",
				whiteSpace: "nowrap",
				textOverflow: "ellipsis",
			},
		},
		action: {
			marginLeft: "0.3rem",
			// fontSize: "0.1rem",
			// "& .MuiSvgIcon-root": {
			// 	width: "1.1rem",
			// 	height: "1.1rem",
			// },
		},
	})
);

type TreeProps = {
	functors: IFunctorExplainedWithIdAndTree[];
};

const Tree: FC<TreeProps> = ({ functors }) => {
	const classes = useStyles();
	const dispatch = useContext(FunctorDispatch);

	return (
		<SortableTree
			treeData={functors}
			className={classes.tree}
			onChange={(data) => {
				dispatch &&
					dispatch(functorEditingSetFunctor(data as IFunctorExplainedWithIdAndTree[]));
			}}
			getNodeKey={(x) => x.node.id}
			isVirtualized={false}
			generateNodeProps={(data) => ({
				title: (
					<div>
						{data.node.functorName}
						<IconButton
							className={classes.action}
							size="small"
							aria-label="edit"
							onClick={() =>
								dispatch && dispatch(functorEditingSetCurrentPath(data.path))
							}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							size="small"
							aria-label="add child"
							onClick={() =>
								dispatch && dispatch(functorEditingAddChild({ path: data.path }))
							}
						>
							<AddIcon />
						</IconButton>
						{!(!data.parentNode && functors.length === 1) && (
							<IconButton
								size="small"
								aria-label="delete"
								onClick={() =>
									dispatch && dispatch(functorEditingRemove({ path: data.path }))
								}
							>
								<DeleteIcon />
							</IconButton>
						)}
					</div>
				),
				subtitle: describeFromAndTo(data.node as IFunctorExplainedWithIdAndTree),
			})}
		/>
	);
};

export default Tree;
