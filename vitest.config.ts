import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
	test: {
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["e2e/**"],
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
		globals: true,
		css: true,
	},
});
