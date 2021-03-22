import { useRef, useEffect, useState } from "react";
// TODO: shared library

export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T>();

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};

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
