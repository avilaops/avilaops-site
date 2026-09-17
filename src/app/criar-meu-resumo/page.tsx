import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import BriefWizard from "@/components/BriefWizard";
import { absoluteUrl, paginaOpenGraph } from "@/lib/site";

export const metadata: Metadata = {
  title: "Criar meu resumo | Avila Ops",
  description:
    "Responda algumas perguntas rápidas sobre o seu projeto e receba um resumo pronto para a gente começar a conversa.",
  alternates: {
    canonical: absoluteUrl("/criar-meu-resumo"),
  },
  openGraph: paginaOpenGraph({
    title: "Criar meu resumo | Avila Ops",
    description:
      "Responda algumas perguntas rápidas sobre o seu projeto e receba um resumo pronto para a gente começar a conversa.",
    path: "/criar-meu-resumo/",
    image: "/og/paginas/criar-meu-resumo-v1.jpg",
    imageAlt: "Formulário da Avila Ops para montar o resumo do seu projeto",
  }),
  twitter: {
    card: "summary_large_image",
    title: "Criar meu resumo | Avila Ops",
    description: "Poucas perguntas sobre o seu projeto e um resumo pronto para começar a conversa.",
    images: [absoluteUrl("/og/paginas/criar-meu-resumo-v1.jpg")],
  },
};

export default function CriarMeuResumoPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ name: "Criar meu resumo", href: "/criar-meu-resumo" }]} />
      <BriefWizard />
      <Footer />
    </main>
  );
}
