import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Services from "@/components/Services";
import ServiceCatalog from "@/components/ServiceCatalog";
import { absoluteUrl, paginaOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Serviços para dar vida ao seu negócio | Avila Ops",
  description:
    "Site, identidade visual, loja virtual, marketing e atendimento. Encontre os serviços que fazem sentido para o próximo passo da sua empresa.",
  alternates: {
    canonical: absoluteUrl("/servicos"),
  },
  openGraph: paginaOpenGraph({
    title: "Seu negócio tem muito pela frente. | Avila Ops",
    description: "Escolha o próximo passo: mais presença, vendas, tempo ou espaço para crescer.",
    path: "/servicos/",
    image: "/media/vida/servicos-v2.jpg",
    imageAlt: "Serviços para dar vida ao seu negócio com a Avila Ops",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Seu negócio tem muito pela frente. | Avila Ops",
    description: "Site, marca, vendas e atendimento para o próximo momento da sua empresa.",
    images: [absoluteUrl("/media/vida/servicos-v2.jpg")],
  },
};

export default function ServicosPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Serviços", href: "/servicos" }]} />
      <Services />
      <ServiceCatalog />
      <Footer />
    </main>
  );
}
