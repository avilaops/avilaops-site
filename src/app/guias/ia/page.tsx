import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getGuide } from "@/lib/seo-guides";
import { absoluteUrl, siteConfig } from "@/lib/site";

const path = "/guias/ia";
const title = "Guias de IA para pequenas empresas";
const description =
  "Prompts prontos, atendimento com IA, LGPD e como aparecer nas respostas do ChatGPT e do Google: os guias de inteligência artificial da Avila Ops.";
/** Card 1200x630 gerado por scripts/generate-og-images.mjs (EXTRA_PAGES). */
const ogImage = "/og/ia.png";

export const metadata: Metadata = {
  title: `${title} | Avila Ops`,
  description,
  alternates: {
    canonical: absoluteUrl(path),
  },
  openGraph: {
    title: `${title} | Avila Ops`,
    description,
    url: absoluteUrl(path),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Avila Ops`,
    description,
    images: [ogImage],
  },
};

/** Guias de IA que já existem em `src/lib/seo-guides.ts`. */
const guideSlugs = [
  "como-fazer-minha-empresa-aparecer-no-chatgpt-e-nas-ias",
  "agente-de-ia-no-whatsapp-vale-a-pena-para-pequena-empresa",
  "como-usar-ia-no-atendimento-sem-violar-a-lgpd",
  "meu-site-perdeu-trafego-com-as-respostas-de-ia-do-google",
];

/** Páginas de IA que vivem fora do índice de guias. */
const extraGuides = [
  {
    href: "/guias/ia/prompts-para-ia",
    title: "Prompts para IA: 7 efeitos de imagem prontos para copiar",
    description:
      "Biblioteca de prompts em português para editar foto com IA preservando a identidade da pessoa: cromo, clone, boneco, pôster, halo, LEGO e comida Minecraft.",
  },
];

export default function GuiasIaPage() {
  const guides = guideSlugs
    .map((slug) => getGuide(slug))
    .filter((guide) => guide !== undefined);

  return (
    <main>
      <Header />
      <Breadcrumbs
        items={[
          { name: "Guias", href: "/guias" },
          { name: "IA", href: path },
        ]}
      />

      <section className="seo-page-hero">
        <div className="container">
          <span className="section-index">Avila Ops / Guias / IA</span>
          <h1>Guias de inteligência artificial para pequenas empresas</h1>
          <p>
            O que dá para usar hoje, sem virar experimento caro: prompts
            prontos, atendimento com IA dentro da LGPD e o que fazer para a sua
            empresa aparecer nas respostas do ChatGPT e do Google.
          </p>
        </div>
      </section>

      <section className="seo-page-section">
        <div className="container seo-guide-list">
          {extraGuides.map((guide) => (
            <article key={guide.href}>
              <span>BIBLIOTECA</span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <a href={guide.href}>Abrir biblioteca</a>
            </article>
          ))}

          {guides.map((guide) => (
            <article key={guide.slug}>
              <span>GUIA</span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <a href={`/guias/${guide.slug}`}>Ler guia</a>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
