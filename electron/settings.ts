import fs from "node:fs";
import path from "node:path";
import { app } from "electron";

export type AppSettings = {
	isMaximized: boolean;
};

const DEFAULT_SETTINGS: AppSettings = {
	isMaximized: true,
};

function getSettingsFilePath(): string {
	return path.join(app.getPath("userData"), "settings.json");
}

function normalizeSettings(input: unknown): AppSettings {
	if (!input || typeof input !== "object") {
		return { ...DEFAULT_SETTINGS };
	}

	const raw = input as Partial<AppSettings>;

	return {
		isMaximized:
			typeof raw.isMaximized === "boolean"
				? raw.isMaximized
				: DEFAULT_SETTINGS.isMaximized,
	};
}

export function saveAppSettings(settings: AppSettings): void {
	const settingsFilePath = getSettingsFilePath();
	const normalized = normalizeSettings(settings);

	fs.mkdirSync(path.dirname(settingsFilePath), { recursive: true });
	fs.writeFileSync(
		settingsFilePath,
		JSON.stringify(normalized, null, 2),
		"utf-8",
	);
}

export function loadAppSettings(): AppSettings {
	const settingsFilePath = getSettingsFilePath();

	if (!fs.existsSync(settingsFilePath)) {
		saveAppSettings(DEFAULT_SETTINGS);
		return { ...DEFAULT_SETTINGS };
	}

	try {
		const raw = fs.readFileSync(settingsFilePath, "utf-8");
		const parsed = JSON.parse(raw) as unknown;
		const normalized = normalizeSettings(parsed);
		saveAppSettings(normalized);
		return normalized;
	} catch {
		saveAppSettings(DEFAULT_SETTINGS);
		return { ...DEFAULT_SETTINGS };
	}
}
