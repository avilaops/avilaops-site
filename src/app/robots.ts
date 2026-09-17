import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/**
 * Permite rastreamento público amplo, incluindo buscadores, mecanismos de
 * respostas e crawlers usados para treinamento de modelos.
 *
 * A regra `*` já libera tudo, mas os agentes de IA são declarados
 * explicitamente porque vários deles ignoram wildcards ou aplicam regras
 * próprias por user-agent. Declarar o allow evita bloqueio por default.
 */
const searchBots = [
  "*",
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "DuckDuckBot",
  "Applebot",
  "Applebot-Extended",
];

const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Gemini-Deep-Research",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Amazonbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "MistralAI-User",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [...searchBots, ...aiBots].map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: absoluteUrl("/sitemap.xml"),
    // Sem `host`: extensão aposentada do Yandex; o testador do Bing marca a
    // linha como erro. O host canônico é definido pelo 301 de http/www.
  };
}
