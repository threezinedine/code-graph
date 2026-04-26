import type { JSX, SVGProps } from "react";

export function MaximizeIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
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
				strokeWidth="1.5"
			/>
		</svg>
	);
}

export default MaximizeIcon;
