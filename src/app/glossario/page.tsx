import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { glossaryCover, glossaryTerms } from "@/lib/glossary";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossário de operação digital | Avila Ops",
  description:
    "Definições diretas de WhatsApp Business API, CRM, Pixel da Meta, landing page, domínio, DNS, e-mail profissional, funil de vendas e automação.",
  alternates: {
    canonical: absoluteUrl("/glossario/"),
  },
};

export default function GlossaryPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Glossário", href: "/glossario/" }]} />
      <section className="seo-page-hero editorial-index-hero glossary-index-hero">
        <div className="container">
          <span className="section-index">Avila Ops / Glossário</span>
          <h1>Termos claros para decisões digitais melhores</h1>
          <p>
            Entenda as palavras que aparecem em propostas, campanhas e ferramentas. Aprenda o essencial, compare opções e escolha com segurança.
          </p>
          <div className="editorial-hero-stats glossary-hero-stats" aria-label="Como usar o glossário">
            <span><strong>01</strong> Entenda</span>
            <span><strong>02</strong> Compare</span>
            <span><strong>03</strong> Decida</span>
          </div>
        </div>
      </section>

      <section className="seo-page-section editorial-library-section">
        <div className="container editorial-grid glossary-grid">
          {glossaryTerms.map((entry) => (
            <article className="editorial-card glossary-card" key={entry.slug}>
              <a className="editorial-card-media" href={`/glossario/${entry.slug}/`}>
                <Image src={glossaryCover(entry.slug)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </a>
              <div className="editorial-card-content">
                <div className="editorial-card-meta"><span>TERMO ESSENCIAL</span></div>
                <h2><a href={`/glossario/${entry.slug}/`}>{entry.term}</a></h2>
                <p>{entry.shortDefinition}</p>
                <a className="editorial-card-cta" href={`/glossario/${entry.slug}/`}>Entender na prática →</a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
