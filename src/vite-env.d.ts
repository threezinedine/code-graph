/// <reference types="vite/client" />

interface ElectronAPI {
	minimizeWindow: () => Promise<void>;
	maximizeWindow: () => Promise<void>;
	resizeWindow: () => Promise<void>;
	closeWindow: () => Promise<void>;
	getWindowState: () => Promise<{ isMaximized: boolean }>;
	onWindowMaximizedChanged: (
		callback: (isMaximized: boolean) => void,
	) => () => void;
}

interface Window {
	electronAPI?: ElectronAPI;
}
