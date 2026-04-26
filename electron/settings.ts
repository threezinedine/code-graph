import fs from "node:fs";
import path from "node:path";
import { app } from "electron";

export type AppSettings = {
	isMaximizedAtStart: boolean;
	defaultWindowWidth: number;
	defaultWindowHeight: number;
};

const DEFAULT_SETTINGS: AppSettings = {
	isMaximizedAtStart: true,
	defaultWindowWidth: 1200,
	defaultWindowHeight: 800,
};

function normalizeSettings(input: unknown): AppSettings {
	if (!input || typeof input !== "object") {
		return { ...DEFAULT_SETTINGS };
	}

	const raw = input as Partial<AppSettings>;

	return {
		isMaximizedAtStart:
			typeof raw.isMaximizedAtStart === "boolean"
				? raw.isMaximizedAtStart
				: DEFAULT_SETTINGS.isMaximizedAtStart,
	};
}

function getDefaultAppSettingsPath(): string {
	return path.join(app.getPath("userData"), "settings.json");
}

function getCacheAppSettingsPath(): string {
	return path.join(app.getPath("userData"), "settings-cache.json");
}

export class AppData {
	private readonly filePath: string;
	private data: Partial<AppSettings> = {};

	constructor(filePath: string) {
		this.filePath = filePath;
	}

	load(): Partial<AppSettings> {
		if (!fs.existsSync(this.filePath)) {
			this.data = {};
			return this.data;
		}

		try {
			const raw = fs.readFileSync(this.filePath, "utf-8");
			const parsed = JSON.parse(raw) as unknown;
			this.data =
				parsed && typeof parsed === "object"
					? (parsed as Partial<AppSettings>)
					: {};
		} catch {
			this.data = {};
		}

		return this.data;
	}

	save(data: Partial<AppSettings>): void {
		this.data = data;
		fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
		fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
	}

	get(): Partial<AppSettings> {
		return this.data;
	}
}

export class AppDataManager {
	private static instance: AppDataManager | null = null;
	private readonly defaults: AppSettings;
	readonly settings: AppData[];
	readonly cache: AppData;
	private merged: AppSettings;

	private constructor(
		defaults: AppSettings,
		settings: AppData[],
		cache: AppData,
	) {
		this.defaults = defaults;
		this.settings = settings;
		this.cache = cache;
		this.merged = { ...defaults };
	}

	static initialize(): AppDataManager {
		if (AppDataManager.instance) {
			return AppDataManager.instance;
		}

		const settings = [new AppData(getDefaultAppSettingsPath())];
		const cache = new AppData(getCacheAppSettingsPath());

		AppDataManager.instance = new AppDataManager(
			DEFAULT_SETTINGS,
			settings,
			cache,
		);

		return AppDataManager.instance;
	}

	static getInstance(): AppDataManager {
		if (!AppDataManager.instance) {
			throw new Error("AppDataManager has not been initialized.");
		}

		return AppDataManager.instance;
	}

	load(): AppSettings {
		const layers = this.settings.map((appData) => appData.load());
		this.merged = normalizeSettings(
			Object.assign({}, this.defaults, ...layers),
		);
		this.cache.save(this.merged);
		return this.merged;
	}

	get(): AppSettings {
		return this.merged;
	}

	getDefaultAppData(): AppData {
		return this.settings[0];
	}
}
