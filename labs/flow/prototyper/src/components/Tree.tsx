import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { FC } from "react";
import SortableTree from "react-sortable-tree";
import { describeFromAndTo } from "../_common";
import { useDispatch, useSelector } from "react-redux";
import {
	functorEditingAddChild,
	functorEditingRemove,
	functorEditingSetCurrentPath,
	functorEditingSetFunctor,
	IFunctorExplainedWithIdAndTree,
} from "../store";
import { selectFunctors } from "../store/selectors";

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

type TreeProps = {};

const Tree: FC<TreeProps> = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const functors = useSelector(selectFunctors);

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
