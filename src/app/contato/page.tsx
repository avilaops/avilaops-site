import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contact from "@/components/Contact";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Falar com a Avila Ops | Diagnóstico da operação digital",
  description:
    "Conte onde sua empresa está agora e receba uma leitura inicial, prioridades por impacto e um próximo passo sob medida.",
  alternates: {
    canonical: absoluteUrl("/contato/"),
  },
};

export default function ContatoPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Contato", href: "/contato/" }]} />
      <Contact />
      <Footer />
    </main>
  );
}
