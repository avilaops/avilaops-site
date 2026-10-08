import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Operations from "@/components/Operations";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Da sua ideia ao site no ar | Avila Ops",
  description:
    "Conte sua ideia, veja e ajuste a proposta, publique e evolua. Conheça os três passos para construir a presença digital da sua empresa com a Avila Ops.",
  alternates: {
    canonical: absoluteUrl("/jornada/"),
  },
  openGraph: {
    title: "Uma boa ideia. Um novo começo. | Avila Ops",
    description: "Conheça os três passos para dar vida ao próximo momento da sua empresa.",
    url: absoluteUrl("/jornada/"),
    type: "website",
    images: [{ url: absoluteUrl("/media/vida/jornada-v2.jpg"), width: 1200, height: 630, alt: "A jornada da sua empresa com a Avila Ops" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uma boa ideia. Um novo começo. | Avila Ops",
    description: "Conte sua ideia, veja e ajuste, publique e evolua.",
    images: [absoluteUrl("/media/vida/jornada-v2.jpg")],
  },
};

export default function JornadaPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Jornada", href: "/jornada/" }]} />
      <Operations />
      <Footer />
    </main>
  );
}
