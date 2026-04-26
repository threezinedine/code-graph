import type { JSX } from "react";
import { IconProps } from "./IconProps";
import { strokeWidths } from "./IconProps";

interface ResizeIconProps extends IconProps {}

export function ResizeIcon({
	variant = "normal",
	...props
}: ResizeIconProps): JSX.Element {
	const strokeWidth = strokeWidths[variant];

	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			{/* back rectangle */}
			<rect
				x="4.5"
				y="2.5"
				width="8"
				height="7"
				rx="0.5"
				stroke="currentColor"
				strokeWidth={strokeWidth}
			/>
			{/* front rectangle */}
			<rect
				x="2.5"
				y="5.5"
				width="8"
				height="7"
				rx="0.5"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				fill="var(--icon-bg, #1e1e1e)"
			/>
		</svg>
	);
}

export default ResizeIcon;
