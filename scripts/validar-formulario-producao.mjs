/**
 * Prova, no endereco publico, que o formulario de contato entrega o lead ao
 * Worker de captura.
 *
 * O envio e "melhor esforco": se o navegador bloquear o POST, a pessoa segue
 * para o WhatsApp e ninguem ve erro. Foi assim que os formularios passaram
 * meses sem registrar nada depois da troca de dominio (o Worker so liberava a
 * origem antiga no CORS). Este script preenche o formulario num Chromium de
 * verdade, envia e confere que o POST saiu e que o Worker respondeu 200.
 *
 * O campo-isca `website` vai preenchido: o Worker responde ok e descarta, sem
 * mandar e-mail nem gravar lead. O teste cobre o caminho ate o Worker, nao o
 * que ele faz depois.
 *
 *   node scripts/validar-formulario-producao.mjs
 *
 * PLAYWRIGHT_CHROMIUM_PATH aponta um Chromium ja instalado.
 */
import { chromium } from "playwright";

const siteUrl = (process.env.SITE_URL || "https://avilaops.com").replace(/\/$/, "");
const worker = new URL(
  process.env.NEXT_PUBLIC_LEAD_INTAKE_URL || "https://avila-inc-lead-intake.nicolas-85b.workers.dev",
).origin;

const navegador = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const erros = [];

try {
  const contexto = await navegador.newContext();
  const pagina = await contexto.newPage();
  // O envio abre o WhatsApp em outra aba; ela nao interessa ao teste.
  contexto.on("page", (aba) => {
    if (aba !== pagina) aba.close().catch(() => {});
  });
  const bloqueios = [];
  pagina.on("console", (m) => {
    if (/CORS|Content Security Policy|Refused to connect/i.test(m.text())) bloqueios.push(m.text().slice(0, 200));
  });

  await pagina.goto(`${siteUrl}/contato/`, { waitUntil: "networkidle" });
  const formulario = pagina.locator("form").first();

  // Isca: campo escondido, preenchido pelo setter nativo para o React enxergar.
  await formulario.locator('input[name="website"]').evaluate((campo) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(campo, "teste-automatico");
    campo.dispatchEvent(new Event("input", { bubbles: true }));
  });
  for (const campo of await formulario.locator('input:not([name="website"]):visible, textarea:visible').all()) {
    await campo.fill("Teste automatico do site (ignorar)");
  }
  for (const lista of await formulario.locator("select:visible").all()) {
    await lista.selectOption({ index: 1 });
  }

  const resposta = pagina
    .waitForResponse((r) => r.url().startsWith(worker) && r.request().method() === "POST", { timeout: 30_000 })
    .catch(() => null);
  await formulario.locator('button[type="submit"]').click();
  const chegou = await resposta;

  if (!chegou) {
    erros.push(`o POST para ${worker} nao saiu ou nao teve resposta. ${bloqueios.join(" | ")}`);
  } else {
    if (chegou.status() !== 200) erros.push(`o Worker respondeu ${chegou.status()}`);
    const enviado = chegou.request().postData() || "";
    if (!enviado.includes("teste-automatico")) erros.push("o corpo enviado nao levou os campos do formulario");
  }
} finally {
  await navegador.close();
}

for (const erro of erros) console.error(erro);
console.log(JSON.stringify({ siteUrl, worker, erros: erros.length }));
if (erros.length > 0) process.exit(1);
