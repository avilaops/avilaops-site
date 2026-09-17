import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { estimateGuideMinutes, getGuide, guideCover, guides } from "@/lib/seo-guides";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const defaultReviewedAt = "2026-07-25";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  // Cada guia tem uma imagem própria gerada por scripts/generate-og-images.mjs.
  // O logo do site é quadrado e aparece cortado no formato 1.91:1 dos previews.
  const ogImage = guideCover(guide.slug);

  return {
    title: `${guide.title} | Avila Ops`,
    description: guide.description,
    alternates: {
      canonical: absoluteUrl(`/guias/${guide.slug}`),
    },
    openGraph: {
      title: `${guide.title} | Avila Ops`,
      description: guide.description,
      url: absoluteUrl(`/guias/${guide.slug}`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${guide.title} | Avila Ops`,
      description: guide.description,
      images: [ogImage],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const reviewedAt = guide.reviewedAt || defaultReviewedAt;
  const readingMinutes = estimateGuideMinutes(guide);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    mainEntityOfPage: absoluteUrl(`/guias/${guide.slug}`),
    inLanguage: siteConfig.language,
    datePublished: reviewedAt,
    dateModified: reviewedAt,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: guide.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: guide.answer,
        },
      },
    ],
  };

  return (
    <main>
      <Header />
      <article>
        <Breadcrumbs
          items={[
            { name: "Guias", href: "/guias" },
            { name: guide.title, href: `/guias/${guide.slug}` },
          ]}
        />
        <section className="seo-page-hero editorial-article-hero">
          <div className="container editorial-article-hero-grid">
            <div className="editorial-article-heading">
            <span className="section-index">Avila Ops / Guia</span>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <div className="editorial-article-meta"><span>{readingMinutes} min de leitura</span><span>Revisado em {reviewedAt}</span></div>
            </div>
            <figure className="editorial-cover">
              <Image src={guideCover(guide.slug)} alt={`Imagem editorial: ${guide.title}`} fill priority sizes="(max-width: 900px) 100vw, 54vw" />
            </figure>
          </div>
        </section>

        <section className="editorial-answer-band">
          <div className="container editorial-answer-grid">
            <span>RESPOSTA DIRETA</span>
            <p>{guide.answer}</p>
          </div>
        </section>

        <div className="container editorial-reading-layout">
          <aside className="editorial-toc" aria-label="Neste guia">
            <span>NESTE GUIA</span>
            <ol>{guide.sections.map((section, index) => <li key={section.title}><a href={`#secao-${index + 1}`}>{section.title}</a></li>)}</ol>
          </aside>
          <div className="editorial-article-body">
        {guide.sections.map((section, index) => (
          <section className="editorial-content-section" id={`secao-${index + 1}`} key={section.title}>
            <div className="seo-guide-article">
              <span className="editorial-section-number">{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.checklist ? (
                <ul className="seo-checklist">
                  {section.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        ))}
          </div>
        </div>

        <section className="seo-page-section editorial-related-section">
          <div className="container">
            <h2>Próximos temas relacionados</h2>
            <div className="editorial-related-grid">
              {guide.related.map((relatedSlug) => {
                const relatedGuide = getGuide(relatedSlug);
                return (
                  <a className="editorial-related-card"
                    href={relatedGuide ? `/guias/${relatedSlug}` : `/${relatedSlug}`}
                    key={relatedSlug}
                  >
                    {relatedGuide ? <><Image src={guideCover(relatedGuide.slug)} alt="" width={240} height={126} /><span>{relatedGuide.title}</span></> : <span>{relatedSlug.replaceAll("-", " ")}</span>}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </article>
      <script
        id={`schema-article-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        id={`schema-guide-faq-${guide.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Footer />
    </main>
  );
}
