import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { CloseIcon, MaximizeIcon, MinimizeIcon } from "~/icons";

const meta = {
	title: "Components/Button",
	component: Button,
	tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TopBarIcon: Story = {
	args: {
		variant: "top-bar-icon",
		children: <CloseIcon />,
		style: { backgroundColor: "#da2323" },
	},
	render: () => (
		<div style={{ display: "flex" }}>
			<Button variant="top-bar-icon">
				<MinimizeIcon />
			</Button>
			<Button variant="top-bar-icon">
				<MaximizeIcon />
			</Button>
			<Button
				variant="top-bar-icon"
				style={{ backgroundColor: "#da2323" }}
			>
				<CloseIcon />
			</Button>
		</div>
	),
};
