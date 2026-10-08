/**
 * Fonte unica dos cabecalhos HTTP do avilaops.com.
 *
 * O site e um export estatico servido por dois caminhos diferentes:
 *
 *   1. nginx, dentro da imagem publicada pelo deploy-production.yml;
 *   2. Cloudflare Pages, que le o arquivo `_headers` na raiz do export.
 *
 * Os dois precisam responder exatamente a mesma politica. Em vez de manter
 * duas listas que envelhecem em ritmos diferentes, a politica mora aqui e
 * `scripts/gerar-headers.mjs` traduz para os dois formatos no `postbuild`.
 *
 * O alvo esta no PARAMETROS.MD, pilar 4: "Security Headers: 100% de
 * implementacao". Antes disso a imagem usava o nginx de fabrica, que nao
 * envia nenhum deles.
 */

/** Origem de uma URL, sem caminho nem barra final. Usado no connect-src. */
function origem(url) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * Monta a Content-Security-Policy a partir dos enderecos que o site
 * realmente usa em runtime.
 *
 * `leadIntakeUrl` entra por parametro porque o endpoint vem de
 * NEXT_PUBLIC_LEAD_INTAKE_URL: se alguem trocar o Worker de lugar sem
 * passar por aqui, o formulario de contato para de enviar. Gerar a CSP do
 * mesmo valor que o bundle usa mantem os dois sempre em sincronia.
 *
 * `transcriptionUrl` segue a mesma logica para NEXT_PUBLIC_TRANSCRICAO_URL,
 * o servico de transcricao que recebe o audio do ditado por voz. Fica de
 * fora do connect-src enquanto nao for configurado.
 */
export function montarCsp({ leadIntakeUrl, transcriptionUrl, analytics = true } = {}) {
  const conexoes = new Set(["'self'"]);
  const scripts = new Set(["'self'", "'unsafe-inline'"]);
  const imagens = new Set(["'self'", "data:"]);
  // 'self': /us/demo/auto-shop/ mostra a demo de public/demos/ em um iframe.
  const frames = new Set(["'self'"]);

  const lead = origem(leadIntakeUrl);
  if (lead) conexoes.add(lead);

  const transcricao = origem(transcriptionUrl);
  if (transcricao) conexoes.add(transcricao);

  if (analytics) {
    // GTM entrega a tag; GA4 recebe os eventos. Os curingas cobrem os
    // subdominios regionais (region1.google-analytics.com e afins) que o
    // proprio gtag.js escolhe em runtime.
    scripts.add("https://www.googletagmanager.com");
    frames.add("https://www.googletagmanager.com");
    imagens.add("https://www.googletagmanager.com");
    imagens.add("https://www.google-analytics.com");
    conexoes.add("https://www.googletagmanager.com");
    conexoes.add("https://*.googletagmanager.com");
    conexoes.add("https://www.google-analytics.com");
    conexoes.add("https://*.google-analytics.com");
    conexoes.add("https://*.analytics.google.com");
  }

  const diretivas = [
    ["default-src", ["'self'"]],
    ["base-uri", ["'self'"]],
    ["object-src", ["'none'"]],
    // So o proprio site pode emoldurar uma pagina daqui (a demo acima).
    ["frame-ancestors", ["'self'"]],
    // Os formularios enviam por fetch, nunca por submit nativo para fora.
    ["form-action", ["'self'"]],
    // 'unsafe-inline' e inevitavel aqui: o script do tema noturno roda antes
    // do CSS para a pagina nao piscar clara, os cinco blocos de JSON-LD sao
    // inline e o proprio GTM injeta tags. Export estatico nao tem servidor
    // para gerar nonce por requisicao. Mesmo assim a diretiva tem valor: sem
    // ela qualquer origem poderia carregar script; com ela, so a lista abaixo.
    ["script-src", [...scripts]],
    // Tailwind e os style={{...}} dos componentes produzem CSS inline.
    ["style-src", ["'self'", "'unsafe-inline'"]],
    ["img-src", [...imagens]],
    ["font-src", ["'self'", "data:"]],
    ["connect-src", [...conexoes]],
    ["manifest-src", ["'self'"]],
    ["upgrade-insecure-requests", []],
  ];

  if (frames.size > 0) {
    diretivas.splice(diretivas.length - 1, 0, ["frame-src", [...frames]]);
  } else {
    diretivas.splice(diretivas.length - 1, 0, ["frame-src", ["'none'"]]);
  }

  return diretivas
    .map(([nome, valores]) => (valores.length ? `${nome} ${valores.join(" ")}` : nome))
    .join("; ");
}

/**
 * Cabecalhos aplicados a toda resposta.
 *
 * Nota sobre o HSTS: `includeSubDomains` e `preload` ficam de fora de
 * proposito. A partir do apex eles obrigam HTTPS em todos os subdominios da
 * casa (app, crm, auth, mail, n8n, wa, lojas, tv, sms) e o `preload` e
 * praticamente irreversivel. O max-age de um ano ja garante A+ no SSL Labs;
 * ligar o resto e uma decisao consciente para quando todos os subdominios
 * estiverem confirmados em HTTPS.
 */
export function montarCabecalhos(opcoes = {}) {
  return {
    "Content-Security-Policy": montarCsp(opcoes),
    "Strict-Transport-Security": "max-age=31536000",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy": [
      "accelerometer=()",
      "autoplay=()",
      "browsing-topics=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "geolocation=()",
      "gyroscope=()",
      "interest-cohort=()",
      "magnetometer=()",
      // O ditado da etapa 4 do /criar-meu-resumo/ precisa do microfone. Fica
      // em `(self)`: so o proprio site pede, nunca um iframe de terceiro.
      "microphone=(self)",
      "midi=()",
      "payment=()",
      "usb=()",
      "xr-spatial-tracking=()",
    ].join(", "),
  };
}

/**
 * Cache por tipo de arquivo.
 *
 * O `/_next/static/` carrega hash no nome: o conteudo daquele endereco nunca
 * muda, entao `immutable` por um ano economiza a revalidacao. O HTML precisa
 * do contrario — cada deploy troca o conteudo do mesmo endereco.
 */
export const regrasDeCache = [
  {
    nome: "assets-com-hash",
    padraoPages: "/_next/static/*",
    padraoNginx: "/_next/static/",
    valor: "public, max-age=31536000, immutable",
  },
  {
    nome: "midia",
    padraoPages: null,
    extensoesNginx: ["jpg", "jpeg", "png", "webp", "gif", "svg", "ico", "avif", "woff", "woff2", "mp4", "webm"],
    valor: "public, max-age=604800",
  },
  {
    nome: "html",
    padraoPages: "/*",
    padraoNginx: "/",
    valor: "public, max-age=0, must-revalidate",
  },
];
