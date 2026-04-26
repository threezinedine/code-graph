import type { TopBarProps } from "./TopBarProps";
import styles from "./TopBar.module.scss";
import clsx from "clsx";
import { Button } from "~/components";
import {
	CloseIcon,
	CodeGraphIcon,
	MaximizeIcon,
	MinimizeIcon,
	ResizeIcon,
} from "~/icons";

export function TopBar({
	isMaximized,
	onMinimize,
	onMaximize,
	onClose,
	onResize,
	testId,
	forwardClassName,
	style,
}: TopBarProps) {
	return (
		<div
			className={clsx(styles.wrapper, forwardClassName)}
			style={style}
			data-testid={testId}
		>
			<div className={clsx(styles.container)}>
				<div className={clsx(styles.left)}>
					<div className={clsx(styles.icon)}>
						<CodeGraphIcon
							variant="normal"
							className={clsx(styles.appIcon)}
						/>
					</div>
				</div>
				<div className={clsx(styles.right)}>
					<Button
						variant="top-bar-icon"
						onClick={onMinimize}
						data-testid={testId ? `${testId}-minimize` : undefined}
					>
						<MinimizeIcon variant="normal" />
					</Button>
					<Button
						variant="top-bar-icon"
						onClick={isMaximized ? onResize : onMaximize}
						data-testid={testId ? `${testId}-maximize` : undefined}
					>
						{isMaximized ? (
							<ResizeIcon variant="normal" />
						) : (
							<MaximizeIcon variant="normal" />
						)}
					</Button>
					<Button
						variant="top-bar-icon"
						style={{ backgroundColor: "#da2323" }}
						onClick={onClose}
						data-testid={testId ? `${testId}-close` : undefined}
					>
						<CloseIcon variant="normal" />
					</Button>
				</div>
			</div>
		</div>
	);
}
