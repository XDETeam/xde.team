'use client';

import { Container } from "@/components/Container";

export const Footer = () => (
	<footer className="mt-auto border-t border-gray-200">
		<Container>
			<div className="flex flex-col items-center border-t border-gray-200 pt-8 pb-12 md:flex-row-reverse md:justify-between md:pt-6">
				<p className="mt-6 text-sm text-gray-500 md:mt-0">
					{/* TODO: */}
					&copy; Copyright 2022-{new Date().getFullYear()}. All rights reserved.
				</p>
			</div>
		</Container>
	</footer>
);

export default Footer;

