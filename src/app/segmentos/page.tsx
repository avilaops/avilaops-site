import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Segments from "@/components/Segments";
import { absoluteUrl, paginaOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Segmentos atendidos | Avila Ops",
  description:
    "Tecnologia aplicada ao processo real de cada segmento: serviços profissionais, indústria, logística, alimentação, construção e comércio.",
  alternates: {
    canonical: absoluteUrl("/segmentos/"),
  },
  openGraph: paginaOpenGraph({
    title: "Segmentos atendidos | Avila Ops",
    description: "Tecnologia aplicada ao processo real de cada segmento: serviços profissionais, indústria, logística, alimentação, construção e comércio.",
    path: "/segmentos/",
    image: "/media/vida/segmentos-v2.jpg",
    imageAlt: "Equipes de diferentes segmentos atendidos pela Avila Ops",
  }),
  twitter: { card: "summary_large_image", images: ["/media/vida/segmentos-v2.jpg"] },
};

export default function SegmentosPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Segmentos", href: "/segmentos/" }]} />
      <section className="sc-hero">
        <div className="container sc-hero-grid">
          <div className="sc-hero-copy">
            <span className="sc-eyebrow">Avila Ops / Segmentos</span>
            <h1>Cada negócio tem um jeito de <em>crescer.</em></h1>
            <p>O seu site deve mostrar o que torna sua empresa especial. A gente conecta essa presença ao jeito que você atende, vende e trabalha.</p>
            <div className="sc-hero-actions">
              <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>Contar sobre meu negócio<ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a className="sc-text-link" href="#seu-segmento">Encontrar meu segmento<ArrowDown size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className="sc-hero-visual sc-hero-visual-segments">
            <Image src="/media/vida/segmentos-v2.webp" alt="Pequenos negócios brasileiros ganhando vida com seus empreendedores" fill priority sizes="(max-width: 860px) 100vw, 50vw" />
            <span className="sc-visual-note">Gente que faz.<br /><strong>Ideias que crescem.</strong></span>
          </div>
        </div>
      </section>
      <Segments />
      <Footer />
    </main>
  );
}
