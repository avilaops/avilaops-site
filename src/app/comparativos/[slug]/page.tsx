import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, CircleHelp } from "lucide-react";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { comparisons, getComparison, comparisonImage } from "@/lib/comparisons";
import { absoluteUrl, ogImages, siteConfig } from "@/lib/site";
import "@/components/segmentos-comparativos.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const reviewedAt = "2026-09-12";
const publishedAt = "2026-07-25";

const relatedLabels: Record<string, string> = {
  "presenca-digital-para-pequenas-empresas": "Presença digital para pequenas empresas",
  "automatizar-whatsapp": "Atendimento pelo WhatsApp",
  "instagram-meta-ads": "Instagram e campanhas",
  "automacao-para-pequenas-empresas": "Automação para pequenas empresas",
  "crm-para-pequenas-empresas": "Organização de clientes e oportunidades",
  "portal-do-cliente": "Portal do cliente",
  "criacao-de-site-profissional": "Criação de site profissional",
  "integrar-instagram-whatsapp": "Instagram e WhatsApp conectados",
};

export function generateStaticParams() {
  return comparisons.map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) return {};

  return {
    title: `${comparison.title} | Avila Ops`,
    description: comparison.description,
    alternates: {
      canonical: absoluteUrl(`/comparativos/${comparison.slug}`),
    },
    openGraph: {
      title: `${comparison.title} | Avila Ops`,
      description: comparison.description,
      url: absoluteUrl(`/comparativos/${comparison.slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: ogImages(comparisonImage(comparison, "jpg")),
    },
    twitter: { card: "summary_large_image", images: [comparisonImage(comparison, "jpg")] },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = getComparison(slug);
  if (!comparison) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    description: comparison.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: absoluteUrl(`/comparativos/${comparison.slug}`),
    inLanguage: siteConfig.language,
    datePublished: publishedAt,
    dateModified: reviewedAt,
    image: absoluteUrl(comparisonImage(comparison, "jpg")),
  };

  return (
    <main>
      <Header />
      <article className="sc-detail">
        <Breadcrumbs
          items={[
            { name: "Comparativos", href: "/comparativos" },
            { name: comparison.title, href: `/comparativos/${comparison.slug}` },
          ]}
        />
        <section className="sc-detail-hero">
          <div className="container sc-detail-hero-grid">
            <div>
              <span className="sc-eyebrow">Avila Ops / Escolhas para seu negócio</span>
              <h1>{comparison.title}</h1>
              <p>{comparison.summary}</p>
              <div className="sc-reviewed">Revisado em <time dateTime={reviewedAt}>12 de setembro de 2026</time></div>
              <a className="sc-text-link" href="#opcoes">Veja quando cada opção faz sentido<ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
            <div className="sc-detail-image"><Image src={comparisonImage(comparison)} alt={comparison.title} fill priority sizes="(max-width: 860px) 100vw, 50vw" /></div>
          </div>
        </section>

        <section className="sc-options" id="opcoes" aria-label="Quando escolher cada opção">
          <div className="container sc-options-grid">
            {comparison.options.map((option, index) => (
              <article className="sc-option" key={option.name}>
                <span className="sc-eyebrow">Caminho {String(index + 1).padStart(2, "0")}</span>
                <h2>{option.name}</h2>
                <div className="sc-option-part">
                  <h3><Check size={18} aria-hidden="true" />Quando faz sentido</h3>
                  <p>{option.bestFor}</p>
                </div>
                <div className="sc-option-part">
                  <h3><CircleHelp size={18} aria-hidden="true" />O que avaliar</h3>
                  <p>{option.limitation}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sc-recommendation">
          <div className="container sc-recommendation-grid">
            <span className="sc-eyebrow">Para levar à sua decisão</span>
            <div>
              <h2>Comece pelo que precisa funcionar melhor.</h2>
              <p>{comparison.recommendation}</p>
              <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>Conversar sobre minha ideia<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
        </section>

        <nav className="sc-related container" aria-label="Conteúdos relacionados">
          <h2>Continue explorando</h2>
          <div>{comparison.related.map((relatedSlug) => (
            <Link href={`/${relatedSlug}/`} key={relatedSlug}>{relatedLabels[relatedSlug] || relatedSlug.replaceAll("-", " ")}<ArrowUpRight size={18} aria-hidden="true" /></Link>
          ))}</div>
          <Link className="sc-text-link" href="/comparativos/">Ver todos os comparativos<ArrowUpRight size={18} aria-hidden="true" /></Link>
        </nav>
      </article>
      <script
        id={`schema-comparison-${comparison.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Footer />
    </main>
  );
}
