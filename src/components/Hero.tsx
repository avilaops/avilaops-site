import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="vida-hero" id="inicio" aria-labelledby="home-title">
      <div className="container vida-hero-grid">
        <div className="vida-hero-copy">
          <span className="vida-eyebrow"><i aria-hidden="true" /> Tecnologia para quem tem um negócio e quer ir além</span>
          <h1 id="home-title">Seu negócio<br />tem muito<br /><em>para mostrar.</em></h1>
          <p>Vamos colocar isso no mundo. Criamos sites, marcas, automações e experiências digitais para sua empresa ser encontrada, despertar confiança e vender.</p>
          <div className="vida-actions">
            <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>Quero meu protótipo grátis <ArrowUpRight size={19} aria-hidden="true" /></Link>
            <Link className="vida-link" href="/servicos/" prefetch={false}>Conhecer os serviços <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <span className="vida-hero-note"><Check size={15} aria-hidden="true" /> Primeiro, você vê a ideia. Depois, decide.</span>
        </div>
        <div className="vida-hero-art">
          <div className="vida-hero-image">
            <Image src="/media/vida/home-v2.webp" alt="Cena ilustrativa de uma empreendedora e um designer felizes ao ver o site de uma pequena empresa." width={1536} height={1024} priority sizes="(max-width: 800px) 100vw, 52vw" />
          </div>
          <span className="vida-art-note"><span aria-hidden="true">✳</span> Sua essência. Novas possibilidades.</span>
          <span className="vida-art-stamp" aria-hidden="true">Ideias boas<br />merecem<br /><strong>ganhar vida ↗</strong></span>
        </div>
      </div>
      <div className="container vida-outcomes" aria-label="O que podemos construir juntos">
        <span><strong>Uma marca que faz sentido.</strong> Para ser reconhecida.</span>
        <span><strong>Um site que abre portas.</strong> Para apresentar e vender.</span>
        <span><strong>Uma rotina mais leve.</strong> Para cuidar do que importa.</span>
      </div>
    </section>
  );
}
