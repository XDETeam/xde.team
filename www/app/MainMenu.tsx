"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const Items = [
	["О нас", "/about"],
	["Лаборатории", "/labs"],
	["Услуги", "/services"],
	["Контакты", "/contacts"],
];

export function MainMenu() {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	return (
		<>
			{Items.map(([label, href], index) => (
				<Link
					key={label}
					href={href}
					className="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-white hover:delay-[0ms]"
					onMouseEnter={() => setHoveredIndex(index)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === index && (
							<motion.span
								className="absolute inset-0 rounded-lg bg-red-600"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, transition: { duration: 0.15 } }}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<span className="relative z-10">{label}</span>
				</Link>
			))}
		</>
	)
}

export default MainMenu;