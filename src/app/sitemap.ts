import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const routes = [
  "",
  "/llms.txt",
  "/jornada",
  "/servicos",
  "/segmentos",
  "/contato",
  "/logo",
  "/nicolas",
  "/guias",
  "/guias/ia",
  "/guias/ia/prompts-para-ia",
  "/guias/como-faco-para-minha-empresa-aparecer-no-google",
  "/guias/como-automatizar-minha-empresa",
  "/guias/como-automatizar-whatsapp-da-empresa",
  "/guias/instagram-meta-ads-whatsapp-funil",
  "/guias/como-automatizar-instagram-da-empresa",
  "/guias/como-usar-meta-ads-para-gerar-leads-no-whatsapp",
  "/guias/site-ou-instagram-para-pequena-empresa",
  "/guias/crm-para-pequenas-empresas-com-whatsapp",
  "/guias/whatsapp-comum-ou-business-api",
  "/guias/quanto-custa-criar-uma-presenca-digital-profissional",
  "/guias/como-configurar-pixel-da-meta-e-medir-conversoes",
  "/guias/site-institucional-landing-page-ou-loja-virtual",
  "/guias/o-que-uma-pequena-empresa-precisa-para-vender-melhor-no-digital",
  "/guias/checklist-de-presenca-digital-para-pequenas-empresas",
  "/guias/como-trocar-o-numero-do-whatsapp-business-da-empresa",
  "/guias/como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
  "/guias/meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google",
  "/guias/agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
  "/guias/como-usar-pix-automatico-para-cobranca-recorrente",
  "/guias/reforma-tributaria-o-que-muda-na-operacao-digital-da-empresa",
  "/guias/como-aumentar-o-alcance-no-instagram-com-o-algoritmo-atual",
  "/guias/como-usar-ia-no-atendimento-sem-violar-a-lgpd",
  "/guias/como-configurar-o-e-mail-da-empresa-no-celular-e-no-outlook",
  "/guias/quanto-custa-um-site-profissional-para-pequena-empresa",
  "/guias/site-pronto-ou-site-sob-medida-qual-escolher",
  "/guias/o-que-pedir-em-um-orcamento-de-site",
  "/guias/quem-deve-ser-o-dono-do-dominio-e-da-hospedagem",
  "/guias/site-precisa-de-manutencao-depois-de-pronto",
  "/faq",
  "/traduzindo",
  "/glossario",
  "/politica-de-privacidade",
  "/termos-de-servico",
  "/exclusao-de-dados",
  "/glossario/whatsapp-business-api",
  "/glossario/crm",
  "/glossario/pixel-da-meta",
  "/glossario/landing-page",
  "/glossario/dominio",
  "/glossario/dns",
  "/glossario/e-mail-profissional",
  "/glossario/funil-de-vendas",
  "/glossario/automacao",
  "/comparativos",
  "/comparativos/avila-ops-vs-agencia-tradicional",
  "/comparativos/avila-ops-vs-ferramentas-saas",
  "/comparativos/site-profissional-vs-instagram",
  "/presenca-digital-para-pequenas-empresas",
  "/criacao-de-site-profissional",
  "/dominio-e-hospedagem",
  "/email-profissional",
  "/identidade-visual",
  "/automatizar-minha-empresa",
  "/automatizar-whatsapp",
  "/whatsapp-business-api",
  "/funil-de-vendas-whatsapp",
  "/automacao-de-atendimento",
  "/integrar-site-com-whatsapp",
  "/instagram-meta-ads",
  "/automacao-instagram",
  "/meta-ads-para-empresas",
  "/integrar-instagram-whatsapp",
  "/pixel-da-meta",
  "/automacao-para-pequenas-empresas",
  "/crm-para-pequenas-empresas",
  "/portal-do-cliente",
  "/sistema-para-pequenas-empresas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // O site é exportado com `trailingSlash: true`: a URL sem barra responde 308
  // para a versão com barra. Sem a barra aqui o Search Console marca toda
  // página do sitemap como "Página com redirecionamento" (visto em 28/08/2026).
  const comBarra = (route: string) =>
    route === "" || /\.[a-z0-9]+$/i.test(route) ? route : `${route}/`;

  return routes.map((route) => ({
    url: absoluteUrl(comBarra(route)),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/llms.txt" ? 0.4 : route.includes("automatizar") ? 0.95 : 0.8,
    images: route === "" || route === "/logo" ? [absoluteUrl("/logo.png")] : undefined,
  }));
}
