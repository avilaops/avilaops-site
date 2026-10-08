import imagens from "../../config/imagens.json";

/**
 * Loader do `next/image` para o export estático.
 *
 * Sem servidor de imagem, o Next entregava o arquivo original a todo
 * aparelho: um celular de 390px baixava a foto de 1536px. Aqui cada largura
 * pedida pelo `srcset` vira o arquivo pré-gerado mais próximo, criado no
 * `prebuild` por `scripts/gerar-variantes-imagem.mjs`.
 *
 * As larguras e as pastas cobertas moram em `config/imagens.json`, lidas
 * tanto aqui quanto pelo script: mudar em um lugar só.
 */
export default function loader({ src, width }: { src: string; width: number }) {
  if (!imagens.prefixos.some((prefixo) => src.startsWith(prefixo))) return src;
  const largura = imagens.larguras.find((l) => l >= width) ?? imagens.larguras.at(-1);
  return `${imagens.saida}${src}.${largura}.webp`;
}
