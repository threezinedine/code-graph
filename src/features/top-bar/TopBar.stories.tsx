import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopBar } from "./TopBar";

const meta = {
	title: "Features/TopBar",
	component: TopBar,
	tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		isMaximized: false,
		onClose: () => alert("Close button clicked"),
		onMaximize: () => alert("Maximize button clicked"),
		onMinimize: () => alert("Minimize button clicked"),
		onResize: () => alert("Resize button clicked"),
	},
};

export const Maximized: Story = {
	args: {
		isMaximized: true,
		onClose: () => alert("Close button clicked"),
		onMaximize: () => alert("Maximize button clicked"),
		onMinimize: () => alert("Minimize button clicked"),
		onResize: () => alert("Resize button clicked"),
	},
};
