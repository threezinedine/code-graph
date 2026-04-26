import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = process.cwd();
const iconsDir = path.join(root, "icons");
const svgPath = path.join(iconsDir, "code-graph-icon.svg");
const pngPath = path.join(iconsDir, "icon.png");
const icoPath = path.join(iconsDir, "icon.ico");

async function main() {
	await fs.mkdir(iconsDir, { recursive: true });

	const svgBuffer = await fs.readFile(svgPath);

	// 512x512 PNG for Linux and runtime window icon fallback.
	await sharp(svgBuffer).resize(512, 512).png().toFile(pngPath);

	// Multi-size ICO for Windows executable and window icon.
	const icoBuffer = await pngToIco([
		await sharp(svgBuffer).resize(16, 16).png().toBuffer(),
		await sharp(svgBuffer).resize(24, 24).png().toBuffer(),
		await sharp(svgBuffer).resize(32, 32).png().toBuffer(),
		await sharp(svgBuffer).resize(48, 48).png().toBuffer(),
		await sharp(svgBuffer).resize(64, 64).png().toBuffer(),
		await sharp(svgBuffer).resize(128, 128).png().toBuffer(),
		await sharp(svgBuffer).resize(256, 256).png().toBuffer(),
	]);

	await fs.writeFile(icoPath, icoBuffer);
	console.log("Generated icons/icon.png and icons/icon.ico");
}

main().catch((error) => {
	console.error("Failed to generate icons", error);
	process.exit(1);
});
