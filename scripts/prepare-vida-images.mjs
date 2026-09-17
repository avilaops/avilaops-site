import { readFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Resize/crop delivery derivatives only; AI-generated originals remain untouched.
const sourceDir = process.argv[2];
if (!sourceDir) throw new Error("Usage: node scripts/prepare-vida-images.mjs <original-image-directory>");
const manifest = JSON.parse(await readFile("resources/vida-20260912/manifest.json", "utf8"));
const destination = path.resolve("public/media/vida");
await mkdir(destination, { recursive: true });
for (const item of manifest) {
  if (!item.original) throw new Error(`Missing original mapping: ${item.slug}`);
  const input = path.join(sourceDir, item.original);
  const webp = path.join(destination, `${item.slug}.webp`);
  await sharp(input).rotate().resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 83, effort: 6 }).toFile(webp);
  if (item.social) {
    await sharp(input).rotate().resize(1200, 630, { fit: "cover", position: "centre" }).jpeg({ quality: 87, mozjpeg: true }).toFile(path.join(destination, `${item.slug}.jpg`));
  }
  console.log(`${item.slug}: ${Math.round((await stat(webp)).size / 1024)} KB`);
}
