import path from "node:path";
import { app, BrowserWindow } from "electron";
import { loadAppSettings, saveAppSettings, type AppSettings } from "./settings";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function createMainWindow(initialSettings: AppSettings): BrowserWindow {
	const mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
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
		saveAppSettings({
			...initialSettings,
			isMaximized: mainWindow.isMaximized(),
		});
	};

	mainWindow.on("maximize", persistWindowSettings);
	mainWindow.on("unmaximize", persistWindowSettings);

	if (isDev) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string);
		mainWindow.webContents.openDevTools({ mode: "detach" });
	} else {
		mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
	}

	return mainWindow;
}

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
