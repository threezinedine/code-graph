import type { JSX, SVGProps } from "react";
import { BOLD_ICON_STROKE_WIDTH, NORMAL_ICON_STROKE_WIDTH } from "~/constants";

const strokeWidths = {
	normal: NORMAL_ICON_STROKE_WIDTH,
	bold: BOLD_ICON_STROKE_WIDTH,
} as const;

interface MaximizeIconProps extends SVGProps<SVGSVGElement> {
	variant?: keyof typeof strokeWidths;
}

export function MaximizeIcon({
	variant = "normal",
	...props
}: MaximizeIconProps): JSX.Element {
	const strokeWidth = strokeWidths[variant];

	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<rect
				x="3.5"
				y="3.5"
				width="9"
				height="9"
				rx="0.5"
				stroke="currentColor"
				strokeWidth={strokeWidth}
			/>
		</svg>
	);
}

export default MaximizeIcon;
