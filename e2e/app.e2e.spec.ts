import electronPath from "electron";
import { expect, test, _electron as electron } from "@playwright/test";

test("shows the main app window", async () => {
	test.slow();
	let app;

	try {
		app = await electron.launch({
			// @ts-ignore electron exports the executable path at runtime
			executablePath: electronPath,
			args: ["."],
		});

		const window = await app.firstWindow();
		await window.waitForLoadState("domcontentloaded");
		await expect(
			window.getByRole("heading", {
				name: /Electron \+ React \+ TypeScript/i,
			}),
		).toBeVisible({ timeout: 15_000 });
	} finally {
		if (app) {
			await app.close();
		}
	}
});
