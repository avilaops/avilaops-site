/**
 * Nome de leitura de cada página de serviço, para links relacionados.
 *
 * Os links saíam com o próprio endereço no lugar do nome ("automatizar
 * whatsapp", em minúsculas). O mapa mora aqui porque três modelos de página
 * apontam para os mesmos endereços: serviços, guias e comparativos.
 */
const rotulos: Record<string, string> = {
  "presenca-digital-para-pequenas-empresas": "Presença digital para pequenas empresas",
  "criacao-de-site-profissional": "Criação de site profissional",
  "dominio-e-hospedagem": "Domínio e hospedagem",
  "email-profissional": "E-mail profissional",
  "identidade-visual": "Identidade visual",
  "automatizar-minha-empresa": "Automatizar minha empresa",
  "automatizar-whatsapp": "Atendimento pelo WhatsApp",
  "whatsapp-business-api": "WhatsApp Business API",
  "funil-de-vendas-whatsapp": "Funil de vendas no WhatsApp",
  "automacao-de-atendimento": "Automação de atendimento",
  "integrar-site-com-whatsapp": "Site integrado ao WhatsApp",
  "instagram-meta-ads": "Instagram e campanhas",
  "automacao-instagram": "Automação do Instagram",
  "meta-ads-para-empresas": "Meta Ads para empresas",
  "integrar-instagram-whatsapp": "Instagram e WhatsApp conectados",
  "pixel-da-meta": "Pixel da Meta",
  "automacao-para-pequenas-empresas": "Automação para pequenas empresas",
  "crm-para-pequenas-empresas": "CRM para pequenas empresas",
  "portal-do-cliente": "Portal do cliente",
  "sistema-para-pequenas-empresas": "Sistema para pequenas empresas",
};

export function rotuloDaPagina(slug: string) {
  if (rotulos[slug]) return rotulos[slug];
  const texto = slug.replaceAll("-", " ");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
