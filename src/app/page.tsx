import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PortfolioGrid from "@/components/PortfolioGrid";
import Testimonials from "@/components/Testimonials";
import HomeFaq from "@/components/HomeFaq";
import HomeExplore from "@/components/HomeExplore";
import Products from "@/components/Ecosystem";
import Footer from "@/components/Footer";
import Link from "next/link";
import "./home-vida.css";

export default function Home() {
  return (
    <main className="vida-home">
      <Header />
      <Hero />
      <HomeExplore />
      <Products />
      <HowItWorks />
      <PortfolioGrid />
      <Testimonials />
      <HomeFaq />
      <section className="vida-finale">
        <div className="container vida-finale-inner">
          <div>
            <span className="vida-eyebrow">O próximo capítulo é seu</span>
            <h2>Vamos dar vida<br />à sua ideia?</h2>
            <p>Conte o que você faz. A gente ajuda a transformar isso em uma presença digital com a sua cara.</p>
          </div>
          <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>Quero meu protótipo grátis <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
