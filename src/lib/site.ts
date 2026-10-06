const normalizePhone = (value: string) => value.replace(/\D/g, "");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://avilaops.com";
const whatsapp = normalizePhone(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5517997811471",
);

export const siteConfig = {
  name: "Avila Ops",
  legalName: "Ávila Ops Tecnologia",
  alternateName: ["Ávila Ops", "Avila.inc"],
  description:
    "Organizamos a tecnologia da sua empresa: site, e-mail, atendimento, CRM, automações e integrações em uma estrutura que você consegue operar e evoluir.",
  siteUrl,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://app.avilaops.com",
  clientPortalUrl:
    process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL ||
    "https://cliente.avilaops.com",
  whatsapp,
  phoneDisplay: `+${whatsapp}`,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "nicolas@avilaops.com",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/avila.ops",
  tiktokUrl:
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://www.tiktok.com/@avilaops",
  linkedinUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/company/avilaops",
  locale: "pt_BR",
  language: "pt-BR",
  logoPath: "/logo.png",
  logoSvgPath: "/logo.svg",
  /** Dimensões reais de public/logo.png. */
  logoWidth: 512,
  logoHeight: 504,
  logoAlt: "Logo oficial da Avila Ops",
  /** Card 1200x630 de fallback, gerado por scripts/generate-og-defaults.mjs. */
  ogImagePath: "/og-default.png",
  city: "Ribeirão Preto",
  region: "SP",
  areaServed: ["Brasil", "Ribeirão Preto"],
  leadIntakeUrl:
    process.env.NEXT_PUBLIC_LEAD_INTAKE_URL ||
    "https://avila-inc-lead-intake.nicolas-85b.workers.dev",
  /**
   * Endpoint do servico de transcricao da casa
   * (`ferramentas/voz/servico-transcricao`, faster-whisper), usado como
   * segunda camada do ditado por voz. Vazio por padrao: sem ele o site
   * usa so o reconhecimento do navegador, sem botao quebrado na tela.
   */
  transcriptionUrl: process.env.NEXT_PUBLIC_TRANSCRICAO_URL || "",
} as const;

/**
 * Imagem do card de link, no formato que `Metadata.openGraph.images` espera.
 *
 * Precisa ser repetida em toda página que declara `openGraph`: o Next
 * substitui o bloco inteiro do layout em vez de mesclar campo a campo, então
 * uma página que declara `openGraph` sem `images` sai sem imagem nenhuma —
 * não herda a do layout.
 */
export function ogImages(path: string = siteConfig.ogImagePath) {
  return [{ url: path, width: 1200, height: 630, alt: siteConfig.name }];
}

/**
 * Bloco `openGraph` de uma pagina interna, ja com os campos que o site
 * inteiro compartilha.
 *
 * O Next substitui o `openGraph` do layout inteiro em vez de mesclar campo a
 * campo. Quem declarava o bloco na mao acabava perdendo `siteName` e
 * `locale`; quem nao declarava herdava `url`, `title` e `description` da
 * home e se apresentava como a home ao ser compartilhado. Passar por aqui
 * resolve os dois: os campos comuns vem de graca e os proprios da pagina
 * sao obrigatorios.
 */
export function paginaOpenGraph({
  title,
  description,
  path,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
}) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website" as const,
    images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: imageAlt }],
  };
}

export function absoluteUrl(path = "") {
  if (!path) return siteConfig.siteUrl;
  if (path.startsWith("http")) return path;
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Âncora da seção de /logo/ que explica como a marca pode ser usada. */
export const logoUsageAnchor = "uso-da-marca";

/**
 * `ImageObject` do logo, emitido pelo layout em todas as páginas e pela
 * própria /logo/.
 *
 * Declarar `creator` ou `copyrightHolder` faz o Google tratar a imagem como
 * licenciável e cobrar o pacote inteiro no Search Console: `license`,
 * `acquireLicensePage`, `creditText` e `copyrightNotice`. Por isso os campos
 * andam juntos aqui, em um lugar só — as duas cópias que existiam antes já
 * tinham saído sem eles.
 *
 * `representativeOfPage` só vale na /logo/: nas outras páginas o logo não é a
 * imagem principal.
 */
export function logoImageSchema({
  representativeOfPage = false,
}: { representativeOfPage?: boolean } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "@id": absoluteUrl("/logo/#image"),
    name: siteConfig.logoAlt,
    caption: `Logo oficial da ${siteConfig.legalName}`,
    contentUrl: absoluteUrl(siteConfig.logoPath),
    thumbnailUrl: absoluteUrl(siteConfig.logoSvgPath),
    url: absoluteUrl("/logo/"),
    width: siteConfig.logoWidth,
    height: siteConfig.logoHeight,
    encodingFormat: "image/png",
    ...(representativeOfPage ? { representativeOfPage: true } : {}),
    creator: {
      "@id": absoluteUrl("/#organization"),
    },
    copyrightHolder: {
      "@id": absoluteUrl("/#organization"),
    },
    creditText: siteConfig.legalName,
    copyrightNotice: `© ${siteConfig.legalName}. Todos os direitos reservados.`,
    license: absoluteUrl(`/logo/#${logoUsageAnchor}`),
    acquireLicensePage: absoluteUrl("/contato/"),
    inLanguage: siteConfig.language,
  };
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
