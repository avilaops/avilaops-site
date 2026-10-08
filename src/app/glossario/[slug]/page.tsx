import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getGlossaryTerm, glossaryCover, glossaryTerms } from "@/lib/glossary";
import { absoluteUrl, siteConfig, dataPorExtenso } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const reviewedAt = "2026-10-08";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

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
            <div className="seo-review-date">Revisado em <time dateTime={reviewedAt}>{dataPorExtenso(reviewedAt)}</time></div>
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

        <section className="seo-page-section glossary-explanation">
          <div className="container seo-guide-article">
            <span className="section-index">NA PRÁTICA</span>
            <h2>Um exemplo do dia a dia</h2>
            <p>{entry.example}</p>
            <h2 style={{ marginTop: 56 }}>Sinais de que isso já é assunto da sua empresa</h2>
            <ul className="seo-checklist">
              {entry.signs.map((sign) => (
                <li key={sign}>{sign}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="seo-page-section">
          <div className="container">
            <h2>Perguntas frequentes sobre {entry.term}</h2>
            <div className="seo-faq-list">
              {entry.faq.map((item) => (
                <article key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
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
        id={`schema-glossary-faq-${entry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        id={`schema-glossary-${entry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <Footer />
    </main>
  );
}
