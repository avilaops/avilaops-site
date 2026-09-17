import Image from "next/image";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

const title = "Logo Avila Ops | Marca oficial";
const description =
  "Logo oficial da Avila Ops Tecnologia para identificação da marca nos buscadores, redes sociais, documentos e materiais comerciais.";

const logoSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": absoluteUrl("/logo/#image"),
  name: "Logo oficial da Avila Ops",
  caption: "Logo oficial da Avila Ops Tecnologia",
  contentUrl: absoluteUrl(siteConfig.logoPath),
  thumbnailUrl: absoluteUrl(siteConfig.logoSvgPath),
  url: absoluteUrl("/logo/"),
  representativeOfPage: true,
  creator: {
    "@id": absoluteUrl("/#organization"),
  },
  copyrightHolder: {
    "@id": absoluteUrl("/#organization"),
  },
  inLanguage: siteConfig.language,
};

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/logo/"),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/logo/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: siteConfig.logoPath,
        width: 512,
        height: 512,
        alt: siteConfig.logoAlt,
      },
    ],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [siteConfig.logoPath],
  },
};

export default function LogoPage() {
  return (
    <main className="section-shell" style={{ paddingTop: "120px", paddingBottom: "96px" }}>
      <script
        id="avila-logo-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(logoSchema) }}
      />

      <section className="logo-page-grid">
        <div className="logo-page-card">
          <Image
            src={siteConfig.logoPath}
            alt={siteConfig.logoAlt}
            width={512}
            height={512}
            priority
            style={{
              width: "min(100%, 360px)",
              height: "auto",
              borderRadius: "28%",
            }}
          />
        </div>

        <div>
          <span className="section-index">Avila Ops / Marca oficial</span>
          <h1>Logo Avila Ops</h1>
          <p className="hero-subtitle">
            Este é o logo oficial da Avila Ops Tecnologia, usado para identificar
            a empresa em buscadores, redes sociais, documentos, propostas e
            materiais comerciais.
          </p>
          <div className="logo-page-actions">
            <a className="btn-primary" href={siteConfig.logoPath}>
              Abrir logo em PNG
            </a>
            <a className="btn-secondary" href={siteConfig.logoSvgPath}>
              Abrir logo em SVG
            </a>
          </div>
          <p className="logo-page-note">
            Nome da marca: Avila Ops. Nome jurídico/comercial: Ávila Ops
            Tecnologia. Base: {siteConfig.city}, {siteConfig.region}. Atendimento:
            Brasil.
          </p>
        </div>
      </section>
    </main>
  );
}
