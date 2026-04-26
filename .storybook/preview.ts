import type { Preview } from "@storybook/react-vite";
import { themes } from "storybook/theming";
// @ts-ignore
import "../src/index.css";

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: "dark",
			values: [
				{ name: "dark", value: "#0f1115" },
				{ name: "light", value: "#ffffff" },
			],
		},
		docs: {
			theme: themes.dark,
		},
		layout: "fullscreen",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
