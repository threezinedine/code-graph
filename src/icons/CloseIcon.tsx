import type { JSX, SVGProps } from "react";

export function CloseIcon(props: SVGProps<SVGSVGElement>): JSX.Element {
	return (
		<svg
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<path
				d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export default CloseIcon;
