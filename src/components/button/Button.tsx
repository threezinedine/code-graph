import type { JSX } from "react";
import type { ButtonProps } from "./ButtonProps";
import clsx from "clsx";
import styles from "./Button.module.scss";

export function Button({
	leftIcon,
	rightIcon,
	text,
	children,
	forwardClassName,
	variant,
	style,
	onClick,
	testId,
	...buttonProps
}: ButtonProps): JSX.Element {
	return (
		<button
			data-testid={testId}
			className={clsx(styles.button, forwardClassName, {
				[styles.topBarIcon]: variant === "top-bar-icon",
				[styles.sideBarIcon]: variant === "side-bar-icon",
			})}
			onClick={onClick}
			style={style}
			{...buttonProps}
		>
			{leftIcon}
			{children ?? text}
			{rightIcon}
		</button>
	);
}

export default Button;
