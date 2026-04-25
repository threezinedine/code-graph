import path from "node:path";
import { app, BrowserWindow } from "electron";

const isDev = Boolean(process.env.VITE_DEV_SERVER_URL);

function createMainWindow(): BrowserWindow {
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

	if (isDev) {
		mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL as string);
		mainWindow.webContents.openDevTools({ mode: "detach" });
	} else {
		mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
	}

	return mainWindow;
}

app.whenReady().then(() => {
	createMainWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createMainWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
