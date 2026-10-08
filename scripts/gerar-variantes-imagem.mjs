/**
 * Gera as versões redimensionadas das imagens que o `next/image` pede.
 *
 * Roda no `prebuild`. Para cada imagem coberta por `config/imagens.json`
 * grava `public/_v/<caminho original>.<largura>.webp`, uma por largura, sem
 * nunca ampliar: se o original tem 512px, a "variante de 1600" sai com 512.
 * Assim toda largura do `srcset` tem arquivo e `src/lib/image-loader.ts`
 * não precisa saber o tamanho de nada.
 *
 * O resultado não é versionado (é consequência das imagens de `public/`) e
 * só é refeito quando o original muda.
 *
 *   node scripts/gerar-variantes-imagem.mjs
 */
import { mkdirSync, readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const { larguras, prefixos, saida } = JSON.parse(readFileSync("config/imagens.json", "utf8"));
const raiz = "public";

function listar(dir) {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    return statSync(caminho).isDirectory() ? listar(caminho) : [caminho];
  });
}

const originais = listar(raiz)
  .map((arquivo) => arquivo.slice(raiz.length).split("\\").join("/"))
  .filter((src) => !src.startsWith(`${saida}/`))
  .filter((src) => /\.(jpe?g|png|webp)$/i.test(src))
  .filter((src) => prefixos.some((prefixo) => src.startsWith(prefixo)));

let geradas = 0;
let bytes = 0;
for (const src of originais) {
  const origem = join(raiz, src);
  const modificado = statSync(origem).mtimeMs;
  for (const largura of larguras) {
    const destino = join(raiz, saida, `${src}.${largura}.webp`);
    if (!existsSync(destino) || statSync(destino).mtimeMs < modificado) {
      mkdirSync(dirname(destino), { recursive: true });
      await sharp(origem)
        .rotate()
        .resize({ width: largura, withoutEnlargement: true })
        .webp({ quality: 78, effort: 5 })
        .toFile(destino);
      geradas += 1;
    }
    bytes += statSync(destino).size;
  }
}

console.log(
  JSON.stringify({ originais: originais.length, larguras: larguras.length, geradas, totalMB: Number((bytes / 1048576).toFixed(1)) }),
);
