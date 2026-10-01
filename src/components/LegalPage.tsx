import { siteConfig } from "@/lib/site";
import Link from "next/link";

// Endereços e e-mails citados no texto viram links, sem obrigar cada página a
// montar JSX. A pontuação final não entra no link.
const LINK_PATTERN = /(https?:\/\/[^\s,;)]+[^\s,;).]|[\w.+-]+@[\w-]+\.[\w.]+\w)/g;

function withLinks(text: string) {
  return text.split(LINK_PATTERN).map((part, index) => {
    if (index % 2 === 0) return part;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return <a key={index} href={href}>{part}</a>;
  });
}

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
                <p key={paragraph}>{withLinks(paragraph)}</p>
              ))}
            </section>
          ))}
        </article>
      </section>
    </main>
  );
}
