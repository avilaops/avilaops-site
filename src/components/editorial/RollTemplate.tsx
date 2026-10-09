import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPosts, getCategories } from "@/lib/editorial/repository";
import { type Post, PAGE_SIZE, postPath, readingMinutes, slugify, listingPreviewPath } from "@/lib/editorial/model";
import { absoluteUrl } from "@/lib/site";

export function rollMetadata(base: string, page = 1, category?: string): Metadata {
  const path = page === 1 ? base : `${base}pagina/${page}/`;
  const title = `${category || (base === "/blog/" ? "Blog" : "Guias")}${page > 1 ? ` — página ${page}` : ""} | Avila Ops`;
  const description = "Guias para decidir melhor sobre sites, atendimento, marketing e automação. Explicações práticas para a rotina da sua pequena empresa.";
  const image = { url: absoluteUrl(listingPreviewPath(base, page)), width: 1200, height: 630, alt: `${labelFor(base, category)} — página ${page}: guias da Avila Ops` };
  return { title: { absolute: title }, description, alternates: { canonical: absoluteUrl(path) }, openGraph: { title, description, url: absoluteUrl(path), type: "website", images: [image] }, twitter: { card: "summary_large_image", title, description, images: [image] } };
}
const labelFor = (base: string, category?: string) => category || (base === "/blog/" ? "Blog" : "Guias");
export function PostCard({ post }: { post: Post }) {
  return <article className="editorial-roll-card"><Link href={postPath(post)} prefetch={false} tabIndex={-1} aria-hidden="true"><Image src={post.cover.src} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} loading="lazy" sizes="(max-width: 600px) 100vw, (max-width: 1100px) 45vw, 360px" /></Link><div className="editorial-card-meta"><span>{post.category}</span><span>{readingMinutes(post)} min</span></div><h3><Link href={postPath(post)} prefetch={false}>{post.title}</Link></h3><p>{post.description}</p></article>;
}
export default function RollTemplate({ base = "/blog/", page = 1, category }: { base?: string; page?: number; category?: string }) {
  const posts = getPosts().filter(post => !category || post.category === category);
  const pages = Math.ceil(posts.length / PAGE_SIZE);
  const label = category || (base === "/blog/" ? "Blog" : "Guias");
  return <><Header /><main className="editorial-page"><Breadcrumbs items={[{ name: label, href: base }]} />
    <header className="container editorial-roll-heading"><span className="section-index">Avila Ops / Conhecimento aplicado</span><h1>{category || (base === "/blog/" ? "Menos dúvida. Mais clareza para decidir." : "Guias para fazer o digital funcionar.")}</h1><p>Sites, atendimento e operação explicados para quem cuida de uma pequena empresa.</p><nav aria-label="Bibliotecas"><Link href="/blog/">Blog</Link><Link href="/guias/">Guias</Link><Link href="/guias/ia/">Inteligência artificial</Link></nav></header>
    <div className="container editorial-roll-layout"><aside className="editorial-sidebar"><h2>Por assunto</h2><ul><li><Link href="/blog/">Todos os assuntos</Link></li>{getCategories().map(item => <li key={item.slug}><Link aria-current={item.name === category ? "page" : undefined} href={`/blog/categoria/${slugify(item.name)}/`}>{item.name}</Link></li>)}</ul><p>Orientação prática para transformar uma dúvida em próximo passo.</p></aside>
      <section aria-labelledby="articles-title"><div className="editorial-roll-count"><h2 id="articles-title">{category || "Explore os artigos"}</h2><span>{posts.length} artigos · página {page} de {pages}</span></div><div className="editorial-roll-grid">{posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(post => <PostCard key={post.slug} post={post} />)}</div>
        <nav className="editorial-pagination" aria-label="Paginação dos artigos">{Array.from({ length: pages }, (_, index) => index + 1).map(number => <Link key={number} href={number === 1 ? base : `${base}pagina/${number}/`} aria-current={number === page ? "page" : undefined} aria-label={`Página ${number}`}>{number}</Link>)}</nav>
      </section>
    </div>
  </main><Footer /></>;
}
