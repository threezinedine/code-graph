import type { JSX } from "react";
import type { IconProps } from "./IconProps";
import { strokeWidths } from "./IconProps";

interface MaximizeIconProps extends IconProps {}

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
