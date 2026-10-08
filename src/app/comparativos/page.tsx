import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Comparison from "@/components/Comparison";
import { comparisons, comparisonImage } from "@/lib/comparisons";
import { absoluteUrl, ogImages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Comparativos de operação digital | Avila Ops",
  description:
    "Compare Avila Ops com agência tradicional, ferramentas SaaS soltas e presença baseada apenas em Instagram.",
  alternates: { canonical: absoluteUrl("/comparativos/") },
  openGraph: {
    title: "Comparativos de operação digital | Avila Ops",
    description: "Compare Avila Ops com agência tradicional, ferramentas SaaS soltas e presença baseada apenas em Instagram.",
    url: absoluteUrl("/comparativos/"),
    images: ogImages("/media/vida/comparativos-v2.jpg"),
  },
  twitter: { card: "summary_large_image", images: ["/media/vida/comparativos-v2.jpg"] },
};

export default function ComparisonsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Comparativos", href: "/comparativos/" }]} />
      <section className="sc-hero">
        <div className="container sc-hero-grid">
          <div className="sc-hero-copy">
            <span className="sc-eyebrow">Avila Ops / Comparativos</span>
            <h1>O melhor caminho é o que faz sentido <em>para você.</em></h1>
            <p>Site, Instagram, agência ou ferramentas por conta própria? Entenda o papel de cada escolha e decida o próximo passo com mais confiança.</p>
            <div className="sc-hero-actions">
              <a className="button button-large" href="#escolha-seu-caminho">Explorar as comparações<ArrowDown size={18} aria-hidden="true" /></a>
              <Link className="sc-text-link" href="/criar-meu-resumo/" prefetch={false}>Falar da minha ideia<ArrowUpRight size={17} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="sc-hero-visual sc-hero-visual-comparisons">
            <Image src="/media/vida/comparativos-v2.webp" alt="Empreendedores avaliando possibilidades para a presença digital de uma pequena empresa" fill priority sizes="(max-width: 860px) 100vw, 50vw" />
            <span className="sc-visual-note">Sua escolha.<br /><strong>Seu próximo capítulo.</strong></span>
          </div>
        </div>
      </section>

      <section className="sc-comparison-library" id="escolha-seu-caminho" aria-labelledby="sc-library-title">
        <div className="container">
          <div className="sc-section-heading">
            <span className="sc-eyebrow">Uma dúvida de cada vez</span>
            <h2 id="sc-library-title">O que você está decidindo hoje?</h2>
          </div>
          <div className="sc-comparison-grid">
            {comparisons.map((comparison, index) => (
              <Link className="sc-comparison-story" href={`/comparativos/${comparison.slug}/`} key={comparison.slug}>
                <div className="sc-story-image"><Image src={comparisonImage(comparison)} alt={comparison.title} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" /></div>
                <div className="sc-story-copy">
                  <span className="sc-eyebrow">Decisão {String(index + 1).padStart(2, "0")}</span>
                  <h3>{comparison.title}</h3>
                  <p>{comparison.description}</p>
                  <span className="sc-text-link">Entender as diferenças<ArrowUpRight size={18} aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Comparison />

      <section className="sc-reading">
        <div className="container sc-reading-grid">
          <div>
            <span className="sc-eyebrow">Vai criar um site?</span>
            <h2>As dúvidas que vale resolver antes de contratar.</h2>
            <p>Leitura prática para chegar à proposta sabendo o que perguntar.</p>
          </div>
          <div className="sc-reading-links">
            <Link href="/guias/site-pronto-ou-site-sob-medida-qual-escolher/">Site pronto ou sob medida?<ArrowUpRight size={20} aria-hidden="true" /></Link>
            <Link href="/guias/o-que-pedir-em-um-orcamento-de-site/">O que pedir em um orçamento?<ArrowUpRight size={20} aria-hidden="true" /></Link>
            <Link href="/guias/quem-deve-ser-o-dono-do-dominio-e-da-hospedagem/">Quem deve controlar o domínio?<ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
