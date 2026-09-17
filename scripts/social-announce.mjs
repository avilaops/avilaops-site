/**
 * Anuncia nas redes as páginas que entraram no ar neste deploy.
 *
 * O gatilho não é "criar a página" e sim o deploy: só o que está publicado de
 * fato em avilaops.com pode virar post. Por isso o script lê `out/sitemap.xml`
 * (o export que subiu) e compara com `data/social-publicados.json`, o registro
 * do que já foi anunciado. O que sobra da comparação é novidade.
 *
 * O texto de cada canal sai daqui, não do n8n: assim o que vai ao ar é
 * revisável em `--dry-run` antes de existir post nenhum, e o fluxo do n8n fica
 * sendo só entrega. O WhatsApp não tem API de Status — para ele o payload leva
 * texto e arte prontos, e alguém posta à mão.
 *
 * Uso:
 *   node scripts/social-announce.mjs --dry-run     mostra o que seria postado
 *   node scripts/social-announce.mjs --seed        marca tudo como já anunciado
 *   node scripts/social-announce.mjs               publica o que é novo
 *   node scripts/social-announce.mjs --only=/guias/x   força uma URL específica
 *   node scripts/social-announce.mjs --limite=5    teto de posts nesta rodada
 *   node scripts/social-announce.mjs --tolerante   falha de envio não derruba
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const outDir = process.env.OUT_DIR || "out";
const siteUrl = process.env.SITE_URL || "https://avilaops.com";
const webhookUrl =
  process.env.SOCIAL_WEBHOOK_URL ||
  "https://n8n.avilaops.com/webhook/avila-ops-publicar-conteudo";
const webhookToken = process.env.SOCIAL_WEBHOOK_TOKEN || "";

const ESTADO = "data/social-publicados.json";

/**
 * Teto por rodada. Um deploy que sobe seis guias de uma vez viraria seis posts
 * seguidos no mesmo minuto — o que o Instagram trata como spam e o leitor
 * também. O excedente fica registrado e sai no próximo deploy.
 */
const LIMITE_PADRAO = 3;

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const seed = args.includes("--seed");
/**
 * No fim de `npm run deploy` o site já subiu. Se o n8n estiver fora do ar ou o
 * token faltar, isso é problema do anúncio, não do deploy — avisa alto e sai
 * com sucesso. As páginas continuam sem registro e saem no próximo deploy.
 */
const tolerante = args.includes("--tolerante");
const only = args.find((a) => a.startsWith("--only="))?.split("=")[1];
const limite = Number(
  args.find((a) => a.startsWith("--limite="))?.split("=")[1] || LIMITE_PADRAO,
);

// ---------------------------------------------------------------- leitura

function lerExport(arquivo) {
  return readFileSync(join(outDir, arquivo), "utf8");
}

function propriedade(html, property) {
  return (
    html.match(
      new RegExp(`<meta property="${property}" content="([^"]*)"`, "i"),
    )?.[1] || ""
  );
}

function metaNome(html, name) {
  return (
    html.match(new RegExp(`<meta name="${name}" content="([^"]*)"`, "i"))?.[1] ||
    ""
  );
}

/** Entidades HTML que aparecem em título e descrição depois do export. */
function desescapar(texto) {
  return texto
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function urlsDoSitemap() {
  const xml = lerExport("sitemap.xml");
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}

/** Caminho do index.html no export para uma URL absoluta do sitemap. */
function arquivoDaUrl(url) {
  const caminho = new URL(url).pathname.replace(/^\/|\/$/g, "");
  if (!caminho) return "index.html";
  // /llms.txt e afins são arquivos soltos, não diretórios com index.
  if (caminho.includes(".")) return caminho;
  return join(caminho, "index.html");
}

// ---------------------------------------------------------------- estado

function lerEstado() {
  if (!existsSync(ESTADO)) return { publicados: [] };
  return JSON.parse(readFileSync(ESTADO, "utf8"));
}

function salvarEstado(estado) {
  mkdirSync(dirname(ESTADO), { recursive: true });
  writeFileSync(ESTADO, `${JSON.stringify(estado, null, 2)}\n`);
}

// ---------------------------------------------------------------- textos

/**
 * O X conta toda URL como 23 caracteres, encurtada pelo t.co, independentemente
 * do tamanho real. Medir com `texto.length` subestima e o post é recusado.
 */
function comprimentoX(texto) {
  return texto.replace(/https?:\/\/\S+/g, "x".repeat(23)).length;
}

function primeiraFrase(texto) {
  const corte = texto.match(/^(.+?[.!?])(\s|$)/);
  return (corte ? corte[1] : texto).trim();
}

function cortar(texto, max) {
  if (texto.length <= max) return texto;
  const corte = texto.slice(0, max - 1);
  const espaco = corte.lastIndexOf(" ");
  return `${(espaco > max * 0.6 ? corte.slice(0, espaco) : corte).trimEnd()}…`;
}

/** Seção da URL, que define tom e hashtags. */
function secaoDe(caminho) {
  if (caminho.startsWith("/guias/")) return "guia";
  if (caminho.startsWith("/glossario/")) return "glossario";
  if (caminho.startsWith("/comparativos/")) return "comparativo";
  return "pagina";
}

const HASHTAGS = {
  guia: "#pequenasempresas #automacao #whatsappbusiness",
  glossario: "#pequenasempresas #tecnologia",
  comparativo: "#pequenasempresas #gestao",
  pagina: "#pequenasempresas #presencadigital",
};

const CHAMADA = {
  guia: "Guia completo no site",
  glossario: "O verbete completo está no site",
  comparativo: "A comparação completa está no site",
  pagina: "Detalhes no site",
};

/**
 * Nem tudo que entra no sitemap é assunto de post. Política de privacidade
 * atualizada não vira story, e arquivos soltos como llms.txt nem HTML têm.
 */
const NAO_ANUNCIAVEIS = new Set([
  "/politica-de-privacidade",
  "/termos-de-servico",
  "/exclusao-de-dados",
]);

function anunciavel(url) {
  const caminho = new URL(url).pathname.replace(/\/$/, "") || "/";
  if (caminho.includes(".")) return false;
  return !NAO_ANUNCIAVEIS.has(caminho);
}

/**
 * Aceita `/guias/x` e `guias/x`. O Git Bash no Windows reescreve argumento que
 * começa com barra para caminho de disco, então exigir a barra quebraria
 * `--only` justamente no shell em que é mais provável digitá-lo à mão.
 */
function normalizarCaminho(valor) {
  const limpo = valor.replace(/\/$/, "");
  return limpo.startsWith("/") ? limpo : `/${limpo}`;
}

function textoX({ titulo, descricao, url }) {
  const base = `${titulo}\n\n${primeiraFrase(descricao)}\n\n${url}`;
  if (comprimentoX(base) <= 280) return base;

  // Sobra para a frase = 280 menos título, URL (23) e as duas quebras duplas.
  const folga = 280 - titulo.length - 23 - 4;
  return `${titulo}\n\n${cortar(primeiraFrase(descricao), Math.max(folga, 0))}\n\n${url}`;
}

function legendaInstagram({ titulo, descricao, url, secao }) {
  return [
    titulo,
    "",
    descricao,
    "",
    `${CHAMADA[secao]}: ${url}`,
    "",
    HASHTAGS[secao],
  ].join("\n");
}

/**
 * O Google Meu Negócio é vitrine de busca local, não rede social: hashtag e
 * "link na bio" destoam, e o link já vai no botão da postagem. Por isso o texto
 * aqui é só título e descrição, dentro do teto de 1.500 caracteres.
 */
function resumoGoogle({ titulo, descricao }) {
  return cortar(`${titulo}\n\n${descricao}`, 1500);
}

function textoWhatsapp({ titulo, url }) {
  return `${titulo}\n\n${url}`;
}

/**
 * Links que abrem o compositor de cada rede, para publicar à mão enquanto a API
 * não está liberada.
 *
 * Só o X aceita texto pré-preenchido, pelo Web Intent — lá é um clique e sai.
 * O Google abre a tela de nova postagem, mas sem preencher nada. O Instagram
 * não tem compositor na web: só sobra copiar a legenda e a arte no celular.
 */
function intentX(texto) {
  return `https://x.com/intent/post?text=${encodeURIComponent(texto)}`;
}

const PAINEL_GOOGLE = "https://business.google.com/posts";

// ---------------------------------------------------------------- payload

function montarPublicacao(url) {
  const caminho = new URL(url).pathname.replace(/\/$/, "") || "/";
  const html = lerExport(arquivoDaUrl(url));

  const titulo = desescapar(
    propriedade(html, "og:title") ||
      html.match(/<title>(.*?)<\/title>/)?.[1] ||
      "",
  )
    // O sufixo da marca é útil no Google e ruído no post.
    .replace(/\s*\|\s*Avila Ops$/, "");
  const descricao = desescapar(
    propriedade(html, "og:description") || metaNome(html, "description") || "",
  );
  const ogImage = propriedade(html, "og:image");

  if (!titulo) throw new Error(`${caminho}: sem título no export`);
  if (!descricao) throw new Error(`${caminho}: sem descrição no export`);

  const secao = secaoDe(caminho);
  const slug = caminho.split("/").filter(Boolean).pop() || "home";

  /**
   * As artes de guia já existem em três proporções. Para as demais páginas só
   * há o card 1200x630 — que o Instagram aceita no feed, mas não em story.
   */
  const arte = (formato, ext = "png") => {
    const arquivo = `social/${slug}-${formato}.${ext}`;
    return existsSync(join(outDir, arquivo))
      ? new URL(`/${arquivo}`, siteUrl).toString()
      : "";
  };

  // O Instagram publica a partir de uma URL pública e só aceita JPEG; o story
  // é postado à mão, então lá o PNG vale mais que a compatibilidade.
  const imagemFeed = arte("quadrado", "jpg") || ogImage;
  const imagemStory = arte("story");

  const xTexto = textoX({ titulo, descricao, url });

  return {
    url,
    caminho,
    slug,
    secao,
    titulo,
    descricao,
    canais: {
      x: { texto: xTexto, intentUrl: intentX(xTexto) },
      instagram: {
        legenda: legendaInstagram({ titulo, descricao, url, secao }),
        imagemUrl: imagemFeed,
        // O Instagram não abre compositor por link: publicar é no app.
        intentUrl: "",
      },
      google: { resumo: resumoGoogle({ titulo, descricao }), botaoUrl: url, intentUrl: PAINEL_GOOGLE },
      whatsapp: {
        texto: textoWhatsapp({ titulo, url }),
        // Sem arte de story a pessoa posta o texto sozinho, e tudo bem.
        imagemUrl: imagemStory || imagemFeed,
      },
    },
  };
}

// ---------------------------------------------------------------- execução

async function enviar(publicacao) {
  const resposta = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(webhookToken ? { "x-avila-webhook-token": webhookToken } : {}),
    },
    body: JSON.stringify(publicacao),
  });

  if (!resposta.ok) {
    throw new Error(
      `webhook respondeu ${resposta.status}: ${(await resposta.text()).slice(0, 200)}`,
    );
  }
}

async function main() {
  const estado = lerEstado();
  const jaPublicados = new Set(estado.publicados.map((p) => p.url));
  const urls = urlsDoSitemap();

  if (seed) {
    const agora = new Date().toISOString();
    estado.publicados = urls.map(
      (url) => estado.publicados.find((p) => p.url === url) || { url, em: agora, origem: "seed" },
    );
    salvarEstado(estado);
    console.log(`${estado.publicados.length} URLs marcadas como já anunciadas.`);
    console.log("A partir daqui, só o que for novo no sitemap vira post.");
    return;
  }

  // Com --only a escolha é explícita e vale mesmo para o que o filtro pularia.
  let alvos = only
    ? urls.filter((url) => normalizarCaminho(new URL(url).pathname) === normalizarCaminho(only))
    : urls.filter((url) => !jaPublicados.has(url) && anunciavel(url));

  if (only && alvos.length === 0) {
    throw new Error(`--only=${only} não está no sitemap do export`);
  }

  if (alvos.length === 0) {
    console.log("Nenhuma página nova neste deploy.");
    return;
  }

  if (!dryRun && !webhookToken) {
    const aviso = `SOCIAL_WEBHOOK_TOKEN não definido — ${alvos.length} página(s) não foram anunciadas.`;
    if (!tolerante) throw new Error(aviso);
    console.warn(`AVISO: ${aviso}`);
    return;
  }

  const adiadas = alvos.slice(limite);
  alvos = alvos.slice(0, limite);

  if (adiadas.length > 0) {
    console.log(
      `${adiadas.length} página(s) ficaram para a próxima rodada (limite ${limite}):`,
    );
    for (const url of adiadas) console.log(`  adiada  ${new URL(url).pathname}`);
    console.log("");
  }

  for (const url of alvos) {
    const publicacao = montarPublicacao(url);

    // O container do Instagram é recusado se a imagem não for JPEG. Melhor
    // saber aqui do que descobrir pela tarefa de falha depois do post.
    const imagemIg = publicacao.canais.instagram.imagemUrl;
    if (!/\.jpe?g$/i.test(imagemIg)) {
      console.warn(
        `AVISO  ${publicacao.caminho}: imagem do Instagram não é JPEG (${imagemIg || "nenhuma"}). ` +
          "Rode npm run social:images -- --formato=quadrado.",
      );
    }

    if (dryRun) {
      console.log(`\n=== ${publicacao.caminho} ===`);
      console.log(`\n[X] (${comprimentoX(publicacao.canais.x.texto)}/280)`);
      console.log(publicacao.canais.x.texto);
      console.log(`abrir já preenchido: ${publicacao.canais.x.intentUrl}`);
      console.log(`\n[Instagram] imagem: ${publicacao.canais.instagram.imagemUrl || "SEM ARTE"}`);
      console.log(publicacao.canais.instagram.legenda);
      console.log(`\n[Google Meu Negócio] botão: ${publicacao.canais.google.botaoUrl}`);
      console.log(publicacao.canais.google.resumo);
      console.log(`\n[WhatsApp — postar à mão] arte: ${publicacao.canais.whatsapp.imagemUrl || "SEM ARTE"}`);
      console.log(publicacao.canais.whatsapp.texto);
      continue;
    }

    try {
      await enviar(publicacao);
    } catch (error) {
      if (!tolerante) throw error;
      console.warn(`\nAVISO: anúncio interrompido — ${error.message}`);
      console.warn("O deploy do site está de pé. As páginas pendentes saem no próximo.");
      return;
    }

    // Só registra depois do webhook aceitar: se o n8n estiver fora, a página
    // continua pendente e sai no próximo deploy. Com --only a URL já pode estar
    // no registro, e aí a data é atualizada em vez de virar entrada repetida.
    const registro = estado.publicados.find((p) => p.url === url);
    if (registro) registro.em = new Date().toISOString();
    else estado.publicados.push({ url, em: new Date().toISOString() });
    salvarEstado(estado);
    console.log(`publicado  ${publicacao.caminho}`);
  }

  if (dryRun) {
    console.log(`\n${alvos.length} publicação(ões) simulada(s). Nada foi enviado.`);
  } else {
    console.log(`\n${alvos.length} publicação(ões) enviada(s) ao n8n.`);
    console.log(`Registro atualizado em ${ESTADO} — faça commit dele.`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
