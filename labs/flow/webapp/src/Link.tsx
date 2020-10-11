import React, { FC, Ref, MouseEventHandler } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink from "@material-ui/core/Link";

const NextComposed = React.forwardRef<
	HTMLAnchorElement,
	NextLinkProps & Pick<LinkProps, "className" | "color">
>(function NextComposed({ as, href, replace, scroll, passHref, shallow, prefetch, ...other }, ref) {
	return (
		<NextLink
			href={href}
			prefetch={prefetch}
			as={as}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			passHref={passHref}
		>
			<a ref={ref} {...other} />
		</NextLink>
	);
});

type LinkProps = {
	href: string | { pathname: string };
	naked?: boolean;
	activeClassName?: string;
	as?: LinkProps["href"];
	className?: string;
	innerRef?: Ref<HTMLAnchorElement>;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	prefetch?: boolean;
	children?: React.ReactNode;
	color?: string;
};

const Link: FC<LinkProps> = ({
	href,
	activeClassName = "active",
	className: classNameProps,
	innerRef,
	naked,
	color,
	...other
}) => {
	const router = useRouter();
	const pathname = typeof href === "string" ? href : href.pathname;
	const className = clsx(classNameProps, {
		[activeClassName]: router.pathname === pathname && activeClassName,
	});

	if (naked) {
		return (
			<NextComposed
				className={className}
				ref={innerRef}
				href={href}
				color={color}
				{...other}
			/>
		);
	}

	return (
		<MuiLink
			component={NextComposed}
			className={className}
			ref={innerRef}
			href={pathname}
			{...other}
		/>
	);
};

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
	<Link {...props} innerRef={ref} />
));
