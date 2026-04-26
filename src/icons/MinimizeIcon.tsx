import type { JSX, SVGProps } from "react";
import { BOLD_ICON_STROKE_WIDTH, NORMAL_ICON_STROKE_WIDTH } from "~/constants";

const strokeWidths = {
	normal: NORMAL_ICON_STROKE_WIDTH,
	bold: BOLD_ICON_STROKE_WIDTH,
} as const;

interface MinimizeIconProps extends SVGProps<SVGSVGElement> {
	variant?: keyof typeof strokeWidths;
}

export function MinimizeIcon({
	variant = "normal",
	...props
}: MinimizeIconProps): JSX.Element {
	const strokeWidth = strokeWidths[variant];

	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M3.5 8.5H12.5"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default MinimizeIcon;
