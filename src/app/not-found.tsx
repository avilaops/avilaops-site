import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Página não encontrada | Avila Ops",
  description: "O endereço que você abriu não existe no site da Avila Ops.",
  robots: { index: false, follow: true },
};

const atalhos = [
  { rotulo: "Serviços", href: "/servicos/" },
  { rotulo: "Guias", href: "/guias/" },
  { rotulo: "Contato", href: "/contato/" },
];

// Sem este arquivo o Next serve a página 404 de fábrica: em inglês, sem
// cabeçalho, sem rodapé e sem nenhum caminho de volta para o site.
export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="seo-page-hero">
        <div className="container">
          <span className="section-index">Erro 404</span>
          <h1>Esta página não existe.</h1>
          <p>
            O endereço pode ter mudado ou sido digitado com um erro. Volte para o
            início ou siga por um dos caminhos abaixo.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 24px", marginTop: 28 }}>
            <Link className="button" href="/">
              Ir para o início
            </Link>
            {atalhos.map((atalho) => (
              <Link className="text-link" href={atalho.href} key={atalho.href}>
                {atalho.rotulo}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
