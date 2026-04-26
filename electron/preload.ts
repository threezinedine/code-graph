import { contextBridge, ipcRenderer } from "electron";

const electronAPI = {
	minimizeWindow: (): Promise<void> => ipcRenderer.invoke("window:minimize"),
	maximizeWindow: (): Promise<void> => ipcRenderer.invoke("window:maximize"),
	resizeWindow: (): Promise<void> => ipcRenderer.invoke("window:resize"),
	closeWindow: (): Promise<void> => ipcRenderer.invoke("window:close"),
	getWindowState: (): Promise<{ isMaximized: boolean }> =>
		ipcRenderer.invoke("window:get-state"),
	onWindowMaximizedChanged: (
		callback: (isMaximized: boolean) => void,
	): (() => void) => {
		const listener = (
			_event: Electron.IpcRendererEvent,
			isMaximized: boolean,
		): void => {
			callback(isMaximized);
		};

		ipcRenderer.on("window:maximized-changed", listener);

		return (): void => {
			ipcRenderer.removeListener("window:maximized-changed", listener);
		};
	},
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
