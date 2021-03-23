import { useEffect, useState } from "react";
// TODO: shared library

/**
 * @returns whether the component did mount
 */
export const useDidMount = (): boolean => {
	const [didMount, setDidMount] = useState<boolean>(false);
	useEffect(() => {
		setDidMount(true);
	}, []);

	return didMount;
};
