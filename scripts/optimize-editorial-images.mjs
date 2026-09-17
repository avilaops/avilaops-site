import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.resolve("public/editorial/guias");
const files = (await readdir(directory)).filter((file) => file.endsWith(".png"));

for (const file of files) {
  const source = path.join(directory, file);
  const destination = path.join(directory, file.replace(/\.png$/i, ".webp"));
  await sharp(source)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .webp({ quality: 84, effort: 5 })
    .toFile(destination);
}

console.log(`Otimizadas ${files.length} capas editoriais em WebP 1200x630.`);
