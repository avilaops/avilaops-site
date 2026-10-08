import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { absoluteUrl, siteConfig, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nicolas Avila | Ávila Ops Tecnologia",
  description:
    "Cartão de visita digital de Nicolas Avila, fundador da Avila Ops: WhatsApp, e-mail, LinkedIn, Instagram e contato para salvar no celular.",
  alternates: {
    canonical: absoluteUrl("/nicolas/"),
  },
  openGraph: {
    title: "Nicolas Avila | Ávila Ops Tecnologia",
    description: "Site, domínio, e-mail, automações de WhatsApp e IA para pequenas empresas.",
    url: absoluteUrl("/nicolas/"),
    images: [{ url: absoluteUrl("/foto-nicolas.jpeg"), width: 1200, height: 1200 }],
  },
};

const acoes = [
  {
    rotulo: "WhatsApp",
    detalhe: "+55 17 99105-3597",
    href: whatsappUrl("Olá Nicolas, peguei seu contato no cartão digital."),
    destaque: true,
  },
  { rotulo: "E-mail", detalhe: siteConfig.founderEmail, href: `mailto:${siteConfig.founderEmail}` },
  { rotulo: "LinkedIn", detalhe: "linkedin.com/company/avilaops", href: siteConfig.linkedinUrl },
  { rotulo: "Instagram", detalhe: "@avila.ops", href: siteConfig.instagramUrl },
  { rotulo: "TikTok", detalhe: "@avilaops", href: siteConfig.tiktokUrl },
  { rotulo: "Site", detalhe: "avilaops.com", href: siteConfig.siteUrl },
];

const cartao: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 24,
  padding: "36px 28px 28px",
  boxShadow: "0 24px 60px rgba(11, 14, 20, 0.12)",
  textAlign: "center",
};

const botao = (destaque?: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "14px 18px",
  borderRadius: 14,
  textDecoration: "none",
  fontWeight: 600,
  background: destaque ? "var(--blue)" : "var(--surface-soft)",
  color: destaque ? "#fff" : "var(--foreground)",
  border: destaque ? "1px solid var(--blue)" : "1px solid var(--border)",
});

export default function CartaoNicolas() {
  const pessoa = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nicolas Avila",
    jobTitle: "Fundador",
    worksFor: { "@type": "Organization", name: siteConfig.legalName, url: siteConfig.siteUrl },
    email: siteConfig.founderEmail,
    telephone: siteConfig.phoneDisplay,
    image: absoluteUrl("/foto-nicolas.jpeg"),
    url: absoluteUrl("/nicolas/"),
    sameAs: [siteConfig.linkedinUrl, siteConfig.instagramUrl, siteConfig.tiktokUrl],
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px 16px",
        background:
          "radial-gradient(circle at 20% 0%, var(--blue-soft), transparent 45%), var(--background)",
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pessoa) }} />
      <section style={cartao} aria-label="Cartão de visita de Nicolas Avila">
        <Image
          src="/foto-nicolas.jpeg"
          alt="Nicolas Avila"
          width={132}
          height={132}
          priority
          style={{
            width: 132,
            height: 132,
            borderRadius: "50%",
            objectFit: "cover",
            margin: "0 auto 18px",
            display: "block",
            border: "4px solid var(--surface)",
            boxShadow: "0 0 0 2px var(--blue)",
          }}
        />
        <h1 style={{ fontSize: 28, lineHeight: 1.15, margin: 0, letterSpacing: "-0.02em" }}>Nicolas Avila</h1>
        <p style={{ margin: "6px 0 0", color: "var(--blue)", fontWeight: 600 }}>Fundador · {siteConfig.legalName}</p>
        <p style={{ margin: "14px 0 24px", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
          Site, domínio, e-mail, automações de WhatsApp e IA para pequenas empresas. Ribeirão Preto e todo o Brasil.
        </p>

        <div style={{ display: "grid", gap: 10, textAlign: "left" }}>
          {acoes.map((a) => (
            <a key={a.rotulo} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={botao(a.destaque)}>
              <span>{a.rotulo}</span>
              <span style={{ fontWeight: 400, fontSize: 14, opacity: 0.85 }}>{a.detalhe}</span>
            </a>
          ))}
        </div>

        <a
          href="/nicolas.vcf"
          download="nicolas-avila.vcf"
          style={{
            display: "inline-block",
            marginTop: 22,
            padding: "12px 20px",
            borderRadius: 999,
            border: "1px solid var(--border-strong)",
            color: "var(--foreground)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Salvar contato no celular
        </a>

        <p style={{ margin: "22px 0 0", fontSize: 12, color: "var(--quiet-foreground)" }}>
          <Link href="/" style={{ color: "inherit" }}>avilaops.com</Link> · protótipo do seu site em 48 horas
        </p>
      </section>
    </main>
  );
}
