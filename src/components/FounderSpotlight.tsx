import { MessageCircle, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappUrl } from "@/lib/site";

export default function FounderSpotlight() {
  return (
    <section className="founder-section">
      <div className="container founder-layout">
        <div className="founder-avatar">
          <Image
            src="/foto-nicolas.jpeg"
            alt="Nícolas, fundador da Avila Ops"
            width={96}
            height={96}
            className="founder-avatar-image"
          />
        </div>
        <div className="founder-copy">
          <h2>Uma pessoa real por trás de cada projeto.</h2>
          <p>
            Sou eu, Nícolas, fundador da Avila Ops. Acompanho pessoalmente cada
            cliente da primeira conversa até o lançamento e além. Você sempre
            tem um contato dedicado, disponível e atento.
          </p>
          <div className="founder-actions">
            <a
              className="button button-secondary"
              href={whatsappUrl("Olá, Nícolas! Quero meu protótipo grátis.")}
            >
              <MessageCircle size={15} aria-hidden="true" />
              Falar comigo
            </a>
            <Link className="button" href="/criar-meu-resumo">
              <Calendar size={15} aria-hidden="true" />
              Marcar conversa
            </Link>
          </div>
          <p className="founder-email">{siteConfig.email}</p>
        </div>
      </div>
    </section>
  );
}
