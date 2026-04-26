import path from "node:path";
import { app, BrowserWindow, ipcMain } from "electron";
import { loadAppSettings, saveAppSettings, type AppSettings } from "./settings";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function getWindowFromEvent(
	event: Electron.IpcMainInvokeEvent,
): BrowserWindow | null {
	return BrowserWindow.fromWebContents(event.sender);
}

function createMainWindow(initialSettings: AppSettings): BrowserWindow {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	if (initialSettings.isMaximized) {
		mainWindow.maximize();
	}

	const persistWindowSettings = (): void => {
		const isMaximized = mainWindow.isMaximized();

		saveAppSettings({
			...initialSettings,
			isMaximized,
		});

		mainWindow.webContents.send("window:maximized-changed", isMaximized);
	};

	mainWindow.on("maximize", persistWindowSettings);
	mainWindow.on("unmaximize", persistWindowSettings);
	mainWindow.webContents.on("did-finish-load", persistWindowSettings);

	if (isDev) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string);
		mainWindow.webContents.openDevTools({ mode: "detach" });
	} else {
		mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
	}

	return mainWindow;
}

ipcMain.handle("window:minimize", (event) => {
	getWindowFromEvent(event)?.minimize();
});

ipcMain.handle("window:maximize", (event) => {
	getWindowFromEvent(event)?.maximize();
});

ipcMain.handle("window:resize", (event) => {
	const window = getWindowFromEvent(event);

	if (!window) {
		return;
	}

	if (window.isMaximized()) {
		window.unmaximize();
	}
});

ipcMain.handle("window:close", (event) => {
	getWindowFromEvent(event)?.close();
});

ipcMain.handle("window:get-state", (event) => {
	const window = getWindowFromEvent(event);

	return {
		isMaximized: window?.isMaximized() ?? false,
	};
});

app.whenReady().then(() => {
	const settings = loadAppSettings();
	createMainWindow(settings);

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow(loadAppSettings());
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
