import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPosts } from "@/lib/editorial/repository";
import { type Post, headings } from "@/lib/editorial/model";

export default function MarkdownBody({ post }: { post: Post }) {
  const published = new Set(getPosts().map(item => `/guias/${item.slug}/`));
  let headingIndex = 0;
  const toc = headings(post);
  const blocks = post.markdown.split(/(?=^## )/m);
  return <div className="editorial-prose">
    {/* Redação: responda à intenção de busca; evite keyword stuffing.
        Markdown é texto não confiável: HTML bruto não é interpretado. */}
    {blocks.map((block, index) => {
      const sectionTitle = block.match(/^## (.+)/)?.[1];
      const illustration = post.illustrations.find(item => item.section === sectionTitle);
      return <div key={index}>
        <Markdown remarkPlugins={[remarkGfm]} components={{
          h1: ({ children }) => <h2>{children}</h2>,
          h2: ({ children }) => <h2 id={toc[headingIndex++]?.id}>{children}</h2>,
          // O contrato editorial permite apenas h2/h3 no corpo.
          h4: ({ children }) => <h3>{children}</h3>,
          h5: ({ children }) => <h3>{children}</h3>,
          h6: ({ children }) => <h3>{children}</h3>,
          a: ({ href, children }) => {
            const url = (href || "").replace(/^https?:\/\/(?:www\.)?avilaops\.com(?=\/|$)/, "");
            if (url.startsWith("/")) {
              const [pathname, hash] = url.split("#");
              const normalized = pathname.endsWith("/") || /\.[a-z]+$/.test(pathname) ? pathname : `${pathname}/`;
              if (["/loja-virtual/", "/comanda-digital/"].includes(normalized) || (normalized.startsWith("/guias/") && !published.has(normalized) && !["/guias/", "/guias/ia/", "/guias/ia/prompts-para-ia/"].includes(normalized))) return <span>{children}</span>;
              return <Link prefetch={false} href={normalized + (hash ? `#${hash}` : "")}>{children}</Link>;
            }
            return <a href={url} rel="noopener noreferrer">{children}</a>;
          },
          table: ({ children }) => <><p className="editorial-table-hint">Deslize a tabela para os lados para ver todas as colunas.</p><div className="editorial-table" tabIndex={0} role="region" aria-label="Tabela do artigo, com rolagem horizontal"><table>{children}</table></div></>,
          img: () => null, // Imagens vêm do contrato validado, com alt e dimensões.
        }}>{block}</Markdown>
        {illustration && <figure><Image src={illustration.src} alt={illustration.alt} width={illustration.width} height={illustration.height} loading="lazy" sizes="(max-width: 800px) 100vw, 760px" /><figcaption>{illustration.alt}</figcaption></figure>}
      </div>;
    })}
  </div>;
}
