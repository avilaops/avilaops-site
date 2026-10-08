import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { estimateGuideMinutes, guideCover, guides } from "@/lib/seo-guides";
import { absoluteUrl, paginaOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guias de WhatsApp, Instagram e operação digital | Avila Ops",
  description:
    "Guias práticos da Avila Ops sobre automação de WhatsApp, Instagram, Meta Ads, CRM, site profissional e presença digital para pequenas empresas.",
  alternates: {
    canonical: absoluteUrl("/guias/"),
  },
  openGraph: paginaOpenGraph({
    title: "Decisões digitais explicadas sem enrolação | Avila Ops",
    description:
      "Guias práticos sobre automação de WhatsApp, Instagram, Meta Ads, CRM e site profissional para quem toca uma pequena empresa.",
    path: "/guias/",
    image: "/og/paginas/guias-v1.jpg",
    imageAlt: "Biblioteca de guias da Avila Ops sobre presença digital e automação",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Decisões digitais explicadas sem enrolação | Avila Ops",
    description: "Guias práticos sobre WhatsApp, Instagram, Meta Ads, CRM e site profissional.",
    images: [absoluteUrl("/og/paginas/guias-v1.jpg")],
  },
};

export default function GuidesPage() {
  const websiteDecisionSlugs = new Set([
    "quanto-custa-um-site-profissional-para-pequena-empresa",
    "site-pronto-ou-site-sob-medida-qual-escolher",
    "o-que-pedir-em-um-orcamento-de-site",
    "quem-deve-ser-o-dono-do-dominio-e-da-hospedagem",
    "site-precisa-de-manutencao-depois-de-pronto",
    "site-institucional-landing-page-ou-loja-virtual",
    "site-ou-instagram-para-pequena-empresa",
  ]);
  const websiteGuides = guides.filter((guide) => websiteDecisionSlugs.has(guide.slug));
  const otherGuides = guides.filter((guide) => !websiteDecisionSlugs.has(guide.slug));

  const renderGuide = (guide: (typeof guides)[number], featured = false) => (
    <article className={featured ? "editorial-card editorial-card-featured" : "editorial-card"} key={guide.slug}>
      <Link className="editorial-card-media" href={`/guias/${guide.slug}/`} aria-label={`Ler: ${guide.title}`}>
        <Image src={guideCover(guide.slug)} alt="" fill sizes={featured ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 100vw, 33vw"} />
      </Link>
      <div className="editorial-card-content">
        <div className="editorial-card-meta"><span>GUIA PRÁTICO</span><span>{estimateGuideMinutes(guide)} MIN</span></div>
        <h3><Link href={`/guias/${guide.slug}/`}>{guide.title}</Link></h3>
        <p>{guide.description}</p>
        <Link className="editorial-card-cta" href={`/guias/${guide.slug}/`}>Ler guia <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  );

  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Guias", href: "/guias/" }]} />
      <section className="seo-page-hero editorial-index-hero">
        <div className="container">
          <span className="section-index">Avila Ops / Guias</span>
          <h1>Decisões digitais explicadas sem enrolação</h1>
          <p>
            Antes de comprar um site, escolher uma ferramenta ou automatizar o
            atendimento, entenda o que realmente muda para o seu negócio.
          </p>
          <div className="editorial-hero-stats" aria-label="Resumo da biblioteca">
            <span><strong>{guides.length}</strong> guias atualizados</span>
            <span><strong>7</strong> decisões sobre sites</span>
            <span><strong>Sem</strong> conteúdo caça-clique</span>
          </div>
        </div>
      </section>

      <section className="seo-page-section editorial-library-section">
        <div className="container">
          <div className="editorial-section-heading">
            <span className="section-index">COMECE POR AQUI</span>
            <h2>Qual site escolher: e por quê</h2>
            <p>As perguntas que empresários deveriam responder antes de pedir orçamento ou entregar o domínio a alguém.</p>
          </div>
          <div className="editorial-grid editorial-grid-featured">
            {websiteGuides.map((guide) => renderGuide(guide, true))}
          </div>
        </div>
      </section>

      <section className="seo-page-section editorial-library-section editorial-library-dark">
        <div className="container">
          <div className="editorial-section-heading">
            <span className="section-index">BIBLIOTECA ÁVILA</span>
            <h2>Vendas, presença digital e operação</h2>
          </div>
          <div className="editorial-grid">
            {otherGuides.map((guide) => renderGuide(guide))}
          </div>
          <Link className="editorial-trail-link" href="/guias/ia/">Explorar a trilha de inteligência artificial →</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
