import { siteConfig } from "@/lib/site";
import Link from "next/link";

type LegalSection = {
  title: string;
  body: string[];
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-page">
      <section className="container legal-hero">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Início</Link>
          <span>{title}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        <small>Última atualização: {updatedAt}</small>
      </section>

      <section className="container legal-layout">
        <aside className="legal-summary">
          <strong>{siteConfig.legalName}</strong>
          <span>{siteConfig.siteUrl}</span>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </aside>

        <article className="legal-content">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}
