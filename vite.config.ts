import path from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "./",
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "src"),
		},
	},
	server: {
		port: 5173,
		strictPort: true,
	},
});
