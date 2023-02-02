/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-inter)', ...fontFamily.sans],
				mono: ['var(--font-roboto-mono)', ...fontFamily.mono],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography')
	],
}
