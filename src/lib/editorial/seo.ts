import type { Metadata } from "next";
import { absoluteUrl, tituloDaPagina } from "@/lib/site";
import { type Post, postPath } from "./model";
const fit = (value: string, limit: number) => value.length <= limit ? value : value.slice(0, limit - 1).replace(/\s+\S*$/, "") + "…";
export function postMetadata(post: Post): Metadata {
  const title = fit(tituloDaPagina(post.seoTitle), 60);
  const description = fit(post.description, 155);
  return {
    title: { absolute: title }, description,
    alternates: { canonical: absoluteUrl(postPath(post)) },
    openGraph: { title, description, type: "article", url: absoluteUrl(postPath(post)), siteName: "Avila Ops", locale: "pt_BR", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [absoluteUrl(post.author.url)], images: [{ url: absoluteUrl(post.cover.src), width: post.cover.width, height: post.cover.height, alt: post.cover.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: absoluteUrl(post.cover.src), alt: post.cover.alt }] },
  };
}
export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org", "@type": "Article", "@id": absoluteUrl(postPath(post)) + "#article",
    headline: post.title, description: post.description, inLanguage: "pt-BR",
    mainEntityOfPage: absoluteUrl(postPath(post)), datePublished: post.publishedAt, dateModified: post.updatedAt,
    author: { "@type": post.author.type, name: post.author.name, url: absoluteUrl(post.author.url) },
    publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: "Avila Ops", url: absoluteUrl("/"), logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") } },
    image: [post.cover, ...post.illustrations].map(image => ({ "@type": "ImageObject", url: absoluteUrl(image.src), contentUrl: absoluteUrl(image.src), caption: image.alt, width: image.width, height: image.height })),
  };
}
// Impede que conteúdo de CMS encerre a tag script.
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
