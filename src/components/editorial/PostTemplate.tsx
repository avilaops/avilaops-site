import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { dataPorExtenso } from "@/lib/site";
import ClosingCta from "@/components/ClosingCta";
import { rotuloDaPagina } from "@/lib/rotulos";
import { type Post, headings, postPath, readingMinutes } from "@/lib/editorial/model";
import { getPosts } from "@/lib/editorial/repository";
import { articleSchema, jsonLd } from "@/lib/editorial/seo";
import MarkdownBody from "./MarkdownBody";
import { PostCard } from "./RollTemplate";

export default function PostTemplate({ post }: { post: Post }) {
  const related = getPosts().filter(item => item.slug !== post.slug).sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category)).slice(0, 3);
  const relatedLinks = post.related.flatMap(value => {
    const target = getPosts().find(item => item.slug === value || postPath(item) === value);
    if (target) return [{ href: postPath(target), title: target.title }];
    // Slugs simples pertencem ao catálogo legado de serviços; links futuros
    // do Markdown não viram links de navegação antes de sua publicação.
    if (!value.includes("/")) return [{ href: `/${value}/`, title: rotuloDaPagina(value) }];
    return [];
  });
  return <><Header /><main className="editorial-page">
    <Breadcrumbs items={[{ name: "Guias", href: "/guias/" }, { name: post.title, href: postPath(post) }]} />
    <article>
      <header className="container editorial-post-header">
        <span className="section-index">Avila Ops / {post.category}</span>
        <h1>{post.title}</h1><p className="editorial-deck">{post.description}</p>
        <div className="editorial-byline"><Link href={post.author.url} rel="author">{post.author.name}</Link><span>{readingMinutes(post)} min de leitura</span>
          {post.publishedAt && <span>Publicado em <time dateTime={post.publishedAt}>{dataPorExtenso(post.publishedAt)}</time></span>}
          {post.updatedAt && <span>Atualizado em <time dateTime={post.updatedAt}>{dataPorExtenso(post.updatedAt)}</time></span>}
        </div>
      </header>
      <div className="container editorial-post-layout">
        <aside className="editorial-sidebar" aria-label="Índice do artigo"><h2>Neste guia</h2><ol>{headings(post).map(item => <li key={item.id}><a href={`#${item.id}`}>{item.title}</a></li>)}</ol><Link href="/blog/">Todos os artigos →</Link></aside>
        <div className="editorial-post-content">
          <figure className="editorial-post-cover"><Image src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} loading="lazy" sizes="(max-width: 800px) 100vw, 800px" /><figcaption>{post.cover.alt}</figcaption></figure>
          <MarkdownBody post={post} />
          <section className="editorial-author"><h2>Sobre {post.author.name}</h2><p>{post.author.bio}</p><Link href={post.author.url}>Conheça o responsável pelo conteúdo →</Link></section>
          {relatedLinks.length > 0 && <section className="editorial-author"><h2>Continue explorando</h2><ul>{relatedLinks.map(link => <li key={link.href}><Link href={link.href}>{link.title}</Link></li>)}</ul></section>}
        </div>
      </div>
    </article>
    <section className="container editorial-related-section"><h2>Guias recomendados</h2><div className="editorial-roll-grid">{related.map(item => <PostCard key={item.slug} post={item} />)}</div></section>
    <ClosingCta title="Quer aplicar isso na sua empresa?" whatsappMessage={`Olá, Avila Ops! Li o guia "${post.title}" e quero conversar.`} />
    <script id={`schema-article-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(post)) }} />
    {post.faq?.length ? <script id={`schema-guide-faq-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: post.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }) }} /> : null}
  </main><Footer /></>;
}
