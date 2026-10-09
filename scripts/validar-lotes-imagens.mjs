import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";
import matter from "gray-matter";

const assets = JSON.parse(await fs.readFile("content/imagens.json", "utf8"));
const files = await fs.readdir("content/guias");
let count = 0;
for (const file of await fs.readdir("content/lotes-imagens")) {
  if (!file.endsWith(".json")) continue;
  const batch = JSON.parse(await fs.readFile(path.join("content/lotes-imagens", file), "utf8"));
  for (const item of batch.imagens) {
    const matches = assets.filter(asset => asset.src === item.src);
    assert.equal(matches.length, 1, `${item.id}: cadastro ausente ou duplicado`);
    const asset = matches[0];
    assert.equal(asset.slug, item.slug);
    assert.equal(asset.alt, item.alt);
    assert(item.revisada && item.alt.trim(), `${item.id}: revisão ou alt ausente`);
    const image = await fs.readFile(path.join("public", item.src));
    const metadata = await sharp(image).metadata();
    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, 1200);
    assert.equal(metadata.height, item.position === 1 ? 630 : 800);
    assert.equal(image.length, item.bytes);
    assert(image.length <= (item.position === 1 ? 150 : 120) * 1024, `${item.id}: peso excedido`);
    const source = files.find(name => name.endsWith(`-${item.slug}.md`));
    assert(source, `${item.id}: guia inexistente`);
    const { content } = matter(await fs.readFile(path.join("content/guias", source), "utf8"));
    if (item.position === 2) assert(content.split(/\r?\n/).includes(`## ${asset.section}`), `${item.id}: seção não encontrada`);
    count++;
  }
}
console.log(`Lotes editoriais: ${count} imagens com formato, peso, alt e seção validados`);
