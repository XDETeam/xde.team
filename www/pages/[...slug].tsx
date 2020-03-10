import { useRouter } from "next/router";

export default props => {
	const router = useRouter();
	const slug = router.query.slug || [];

	return (
		<h1>
			Slugged {props.slug}, {slug.join(" >> ")}
		</h1>
	);
};
