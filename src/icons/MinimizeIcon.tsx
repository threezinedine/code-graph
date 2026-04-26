import type { JSX } from "react";
import type { IconProps } from "./IconProps";
import { strokeWidths } from "./IconProps";

interface MinimizeIconProps extends IconProps {}

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
