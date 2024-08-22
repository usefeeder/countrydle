import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				wiggle: {
					"100%": {
						"flex-basis": "calc(12.5 % - 4px)",
					},
					"0%": {
						"flex-basis": "0",
					},
				},
			},
			animation: {
				wiggle: "wiggle 1s ease-in-out 3s",
			},
		},
	},
	plugins: [],
};
export default config;
