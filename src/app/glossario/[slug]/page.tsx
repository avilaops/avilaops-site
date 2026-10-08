import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getGlossaryTerm, glossaryCover, glossaryTerms } from "@/lib/glossary";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const reviewedAt = "2026-07-25";

export function generateStaticParams() {
  return glossaryTerms.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) return {};

  return {
    title: `O que é ${entry.term}? | Glossário Avila Ops`,
    description: entry.shortDefinition,
    alternates: {
      canonical: absoluteUrl(`/glossario/${entry.slug}/`),
    },
    openGraph: {
      title: `O que é ${entry.term}? | Glossário Avila Ops`,
      description: entry.shortDefinition,
      url: absoluteUrl(`/glossario/${entry.slug}/`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [{ url: glossaryCover(entry.slug), width: 1200, height: 630, alt: entry.term }],
    },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getGlossaryTerm(slug);
  if (!entry) notFound();

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.term,
    description: entry.explanation,
    inDefinedTermSet: absoluteUrl("/glossario/"),
    url: absoluteUrl(`/glossario/${entry.slug}/`),
    inLanguage: siteConfig.language,
    dateModified: reviewedAt,
  };

  return (
    <main>
      <Header />
      <article>
        <Breadcrumbs
          items={[
            { name: "Glossário", href: "/glossario/" },
            { name: entry.term, href: `/glossario/${entry.slug}/` },
          ]}
        />
        <section className="seo-page-hero editorial-article-hero glossary-term-hero">
          <div className="container editorial-article-hero-grid">
            <div className="editorial-article-heading">
            <span className="section-index">Avila Ops / Glossário</span>
            <h1>{entry.term}</h1>
            <p>{entry.shortDefinition}</p>
            <div className="seo-review-date">Revisado em {reviewedAt}</div>
            </div>
            <figure className="editorial-cover"><Image src={glossaryCover(entry.slug)} alt={`Representação visual de ${entry.term}`} fill priority sizes="(max-width: 900px) 100vw, 54vw" /></figure>
          </div>
        </section>

        <section className="seo-page-section glossary-explanation">
          <div className="container seo-guide-article">
            <span className="section-index">SEM TECNIQUÊS</span>
            <h2>O que significa na prática</h2>
            <p>{entry.explanation}</p>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Onde isso aparece na operação</h2>
            <div className="seo-related-links">
              {entry.related.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>
      <script
        id={`schema-glossary-${entry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <Footer />
    </main>
  );
}
