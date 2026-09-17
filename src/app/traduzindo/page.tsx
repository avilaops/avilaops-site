import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { glossaryCover, glossaryTerms } from "@/lib/glossary";
import { guides, guideCover, estimateGuideMinutes } from "@/lib/seo-guides";
import { absoluteUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Traduzindo | termos e decisões do mercado tech | Avila Ops",
  description:
    "Perguntas honestas, jargões traduzidos e guias práticos para escolher tecnologia e organizar a operação da sua empresa.",
  alternates: { canonical: absoluteUrl("/traduzindo") },
};

const questions = [
  ["O protótipo é realmente grátis?", "Sim. O protótipo inicial é gratuito e mostra uma direção visual antes de você decidir pelo desenvolvimento completo."],
  ["Site pronto ou sob medida: qual escolher?", "Um site pronto pode resolver uma necessidade simples e imediata. Sob medida faz sentido quando sua marca, operação ou jornada de venda precisa de mais controle e diferenciação."],
  ["Preciso de CRM para começar?", "Não necessariamente. O CRM começa a valer quando contatos, retornos e oportunidades já estão se perdendo entre WhatsApp, planilhas e memória da equipe."],
  ["Quanto custa criar uma presença digital profissional?", "O investimento depende do tipo de site, conteúdo, integrações e responsabilidade da operação. O importante é comparar escopo, não apenas preço de entrada."],
  ["A tecnologia precisa ser complicada?", "Não. A parte complexa deve ficar nos bastidores. Para a equipe, o sistema precisa ser claro, rápido e conectado ao jeito real de trabalhar."],
];

const featuredTerms = glossaryTerms.slice(0, 6);
const featuredGuides = guides.filter((guide) => [
  "site-pronto-ou-site-sob-medida-qual-escolher",
  "quanto-custa-um-site-profissional-para-pequena-empresa",
  "site-institucional-landing-page-ou-loja-virtual",
].includes(guide.slug));

export default function TraduzindoPage() {
  return (
    <main className="traduzindo-page">
      <Header />
      <Breadcrumbs items={[{ name: "Traduzindo", href: "/traduzindo" }]} />

      <section className="traduzindo-hero">
        <div className="container">
          <div className="traduzindo-hero-orb traduzindo-hero-orb-red" />
          <div className="traduzindo-hero-orb traduzindo-hero-orb-yellow" />
          <span className="section-index">Avila Ops / Traduzindo</span>
          <h1>Tecnologia explicada para quem toca uma empresa.</h1>
          <p>Jargões, dúvidas e escolhas importantes traduzidos para a vida real do negócio. Leia, compare e decida com mais segurança.</p>
          <div className="traduzindo-hero-pills"><span>perguntas reais</span><span>termos sem enrolação</span><span>guias de decisão</span></div>
        </div>
      </section>

      <section className="seo-page-section traduzindo-questions">
        <div className="container">
          <div className="traduzindo-section-heading"><span className="section-index">01 / O que todo empresário pergunta</span><h2>Respostas diretas para escolhas que pesam.</h2><p>Você não precisa dominar tecnologia para fazer uma boa escolha. Precisa entender o impacto dela no seu negócio.</p></div>
          <div className="traduzindo-question-list">
            {questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-page-section traduzindo-terms">
        <div className="container">
          <div className="traduzindo-section-heading"><span className="section-index">02 / Dicionário do mercado tech</span><h2>Fale de tecnologia sem deixar a conversa artificial.</h2></div>
          <div className="traduzindo-term-grid">{featuredTerms.map((term) => <Link className="traduzindo-term-card" href={`/glossario/${term.slug}`} key={term.slug}><div className="traduzindo-term-media"><Image src={glossaryCover(term.slug)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><div><span>TERMO {term.slug === "crm" ? "DE NEGÓCIO" : "ESSENCIAL"}</span><h3>{term.term}</h3><p>{term.shortDefinition}</p><strong>Traduzir na prática <i>↗</i></strong></div></Link>)}</div>
        </div>
      </section>

      <section className="seo-page-section traduzindo-guides">
        <div className="container"><div className="traduzindo-section-heading"><span className="section-index">03 / Guias para decidir</span><h2>Quando a dúvida vira próximo passo.</h2><p>Conteúdo para escolher o tipo de site, estimar investimento e construir uma presença digital que faça sentido.</p></div><div className="traduzindo-guide-grid">{featuredGuides.map((guide) => <Link className="traduzindo-guide-card" href={`/guias/${guide.slug}`} key={guide.slug}><div className="traduzindo-guide-media"><Image src={guideCover(guide.slug)} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" /></div><span>{estimateGuideMinutes(guide)} MIN DE LEITURA</span><h3>{guide.title}</h3><p>{guide.description}</p><strong>Ler guia <i>↗</i></strong></Link>)}</div><div className="traduzindo-final"><p>Não encontrou o que queria traduzir?</p><a href={whatsappUrl("Olá, Avila Ops! Quero traduzir uma dúvida sobre tecnologia.")} target="_blank" rel="noopener noreferrer">Falar com a Avila Ops <span>↗</span></a></div></div>
      </section>
      <Footer />
    </main>
  );
}
