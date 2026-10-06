import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  absoluteUrl,
  logoImageSchema,
  logoUsageAnchor,
  siteConfig,
} from "@/lib/site";

const title = "Logo Avila Ops | Marca oficial";
const description =
  "Logo oficial da Avila Ops Tecnologia para identificação da marca nos buscadores, redes sociais, documentos e materiais comerciais.";

const logoSchema = logoImageSchema({ representativeOfPage: true });

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
        width: siteConfig.logoWidth,
        height: siteConfig.logoHeight,
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
            width={siteConfig.logoWidth}
            height={siteConfig.logoHeight}
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

      <section id={logoUsageAnchor} className="logo-page-usage">
        <h2>Uso da marca</h2>
        <p>
          O logo e o nome Avila Ops pertencem à {siteConfig.legalName}. Todos
          os direitos reservados.
        </p>
        <p>
          Pode ser usado, sem alteração de cor, proporção ou desenho, para
          identificar a empresa em matérias, listagens, diretórios e
          materiais de parceiros e clientes. Outros usos — em produtos,
          anúncios ou qualquer contexto que sugira vínculo ou endosso —
          pedem autorização prévia.
        </p>
        <p>
          <Link href="/contato/">Pedir autorização de uso</Link>
        </p>
      </section>
    </main>
  );
}
