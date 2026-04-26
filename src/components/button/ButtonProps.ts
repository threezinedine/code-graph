import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	leftIcon?: ReactNode;
	rightIcon?: ReactNode;
	disabled?: boolean;
	variant?: "top-bar-icon" | "side-bar-icon";
	text?: string;
	children?: ReactNode;
	onClick?: () => void | Promise<void>;
	forwardClassName?: string;
	style?: React.CSSProperties;
	testId?: string;
}
