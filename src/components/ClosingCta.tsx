import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

/**
 * Fechamento das páginas de conteúdo (serviços e guias).
 *
 * Elas terminavam em uma lista de links: quem lia até o fim e queria falar
 * com alguém precisava subir a página de volta para achar um botão.
 */
export default function ClosingCta({
  title = "Quer ver isso funcionando na sua empresa?",
  text = "Conte o que você faz. Você recebe um protótipo para avaliar antes de decidir qualquer coisa.",
  whatsappMessage = "Olá, Avila Ops! Quero conversar sobre a minha empresa.",
}: {
  title?: string;
  text?: string;
  whatsappMessage?: string;
}) {
  return (
    <section className="closing-cta">
      <div className="container closing-cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="closing-cta-actions">
          <Link className="button button-large" href="/criar-meu-resumo/" prefetch={false}>
            Quero meu protótipo grátis <span aria-hidden="true">↗</span>
          </Link>
          <a className="text-link" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
