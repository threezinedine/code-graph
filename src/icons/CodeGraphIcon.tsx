import type { JSX } from "react";
import type { IconProps } from "./IconProps";
import { strokeWidths } from "./IconProps";

interface CodeGraphIconProps extends IconProps {}

export function CodeGraphIcon({
	variant = "normal",
	...props
}: CodeGraphIconProps): JSX.Element {
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
				d="M4 5L7.5 3.4M4 11L7.5 9.4M7.5 3.4L11.8 6M7.5 9.4L11.8 6M7.5 3.4V9.4"
				stroke="currentColor"
				strokeWidth={strokeWidth * 1.4}
				strokeLinecap="round"
			/>
			<circle cx="4" cy="5" r="1" fill="currentColor" />
			<circle cx="4" cy="11" r="1" fill="currentColor" />
			<circle cx="7.5" cy="3.4" r="1" fill="currentColor" />
			<circle cx="7.5" cy="9.4" r="1" fill="currentColor" />
			<circle cx="11.8" cy="6" r="1" fill="currentColor" />
			<path
				d="M9.2 11.4L10.6 12.5L9.2 13.6M6.7 13H10.6"
				stroke="currentColor"
				strokeWidth={strokeWidth * 1.2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default CodeGraphIcon;
