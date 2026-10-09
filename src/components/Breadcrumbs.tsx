import { absoluteUrl, siteConfig } from "@/lib/site";

type Crumb = {
  name: string;
  href: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: siteConfig.name, href: "/" }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {trail.map((crumb, index) => (
            <li key={crumb.href}>
              {index < trail.length - 1 ? (
                <a href={crumb.href}>{crumb.name}</a>
              ) : (
                <span aria-current="page">{crumb.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        id={`schema-breadcrumbs-${trail[trail.length - 1].href.replaceAll("/", "-")}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
