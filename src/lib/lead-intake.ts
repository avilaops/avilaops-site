import { siteConfig } from "@/lib/site";

/**
 * Envia o lead ao Worker de captura, em paralelo ao WhatsApp.
 *
 * O corpo vai como `text/plain` em modo `no-cors` de propósito. O Worker só
 * libera a origem antiga do site nas respostas de CORS; com
 * `application/json` o navegador faz a consulta prévia (preflight), recebe a
 * origem errada e nem chega a enviar o POST. Foi assim que os dois
 * formulários deixaram de registrar lead, calados, quando o site mudou de
 * domínio: o `catch` engolia o erro e a pessoa seguia para o WhatsApp.
 * `text/plain` é "requisição simples": sai sem preflight, e o Worker lê o
 * corpo com `request.json()` do mesmo jeito.
 *
 * `keepalive` segura o envio mesmo com a aba indo para o WhatsApp logo depois.
 *
 * O envio continua sendo melhor esforço: se falhar, o WhatsApp é o caminho
 * principal e a pessoa não vê erro.
 */
export async function enviarLead(dados: Record<string, unknown>) {
  if (!siteConfig.leadIntakeUrl) return;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 4000);

  try {
    await fetch(siteConfig.leadIntakeUrl, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(dados),
      signal: controller.signal,
    });
  } catch {
    // Melhor esforço: ver o comentário acima.
  } finally {
    window.clearTimeout(timeout);
  }
}
