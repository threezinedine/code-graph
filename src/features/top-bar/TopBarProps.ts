export interface TopBarProps {
	isMaximized?: boolean;
	onMinimize?: () => void | Promise<void>;
	onMaximize?: () => void | Promise<void>;
	onClose?: () => void | Promise<void>;
	onResize?: () => void | Promise<void>;
	testId?: string;
	forwardClassName?: string;
	style?: React.CSSProperties;
}
