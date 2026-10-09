// Importa um lote revisado sem alterar textos ou datas de publicação.
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";

const batchPath = process.argv[2];
assert(batchPath, "Informe o JSON do lote revisado");
const batch = JSON.parse(await fs.readFile(batchPath, "utf8"));
const manifestPath = "content/imagens.json";
const assets = JSON.parse(await fs.readFile(manifestPath, "utf8"));
const seen = new Set();
const prepared = [];
for (const item of batch.imagens) {
  assert(item.revisada && item.alt?.trim() && item.prompt?.trim(), `Revisão incompleta: ${item.id}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug), "Slug inválido");
  assert([1, 2].includes(item.position), "Posição inválida");
  const src = `/editorial/guias/${item.slug}${item.position === 2 ? "-2" : ""}.webp`;
  assert(!seen.has(src), `Imagem duplicada no lote: ${src}`);
  seen.add(src);
  const dest = path.join("public", src);
  assert(!assets.some(asset => asset.src === src), `Imagem já cadastrada: ${src}`);
  assert(!(await fs.stat(dest).catch(() => null)), `Arquivo já existe: ${dest}`);
  const width = 1200, height = item.position === 1 ? 630 : 800;
  const limit = (item.position === 1 ? 150 : 120) * 1024;
  let buffer, quality;
  for (quality = 88; quality >= 45; quality -= 3) {
    buffer = await sharp(item.original).resize(width, height, { fit: "cover", position: "centre" }).webp({ quality }).toBuffer();
    if (buffer.length <= limit) break;
  }
  assert(buffer.length <= limit, `Peso excedido: ${item.id}`);
  prepared.push({ item, buffer, quality, dest, src, width, height });
}
for (const { item, buffer, quality, dest, src, width, height } of prepared) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, buffer, { flag: "wx" });
  assets.push({ slug: item.slug, src, alt: item.alt, width, height, section: item.section, position: item.position });
  Object.assign(item, { src, width, height, bytes: buffer.length, quality });
  console.log(`${item.id}: ${width}x${height}, ${buffer.length} bytes`);
}
await fs.writeFile(manifestPath, JSON.stringify(assets, null, 2) + "\n");
await fs.writeFile(batchPath, JSON.stringify(batch, null, 2) + "\n");
