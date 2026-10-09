import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { guides, guideCover } from "@/lib/seo-guides";
import assets from "../../../content/imagens.json";
import legacyAlts from "../../../content/imagens-legado.json";
import { type Post, type EditorialImage, slugify } from "./model";
import { validDate, validatePosts } from "./validation";

// Adaptador local executado no build. Um CMS deve mapear sua resposta para Post,
// aplicar esta mesma política editorial e disparar novo build por webhook.
const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
export function canPublish(status: string, date: string, now = today()) {
  return status === "aprovado" && validDate(date) && date <= now;
}
const team: Post["author"] = {
  name: "Equipe Avila Ops", type: "Organization", url: "/",
  bio: "Conteúdo da Avila Ops Tecnologia para pequenas empresas. A equipe trabalha com sites, e-mail profissional, integrações e automações, conectando presença digital, atendimento e operação. Estes guias explicam decisões técnicas e seus efeitos na rotina do negócio.",
};
function category(slug: string) {
  if (/chatgpt|\bia\b|inteligencia/.test(slug.replaceAll("-", " "))) return "Inteligência artificial";
  if (/whatsapp|crm|atendimento/.test(slug)) return "Atendimento";
  if (/instagram|meta-ads|pixel/.test(slug)) return "Marketing";
  if (/pix|tributaria|automatizar-minha/.test(slug)) return "Operação";
  return "Presença digital";
}
let buildSnapshot: Post[] | undefined;
export function getPosts(): Post[] {
  if (buildSnapshot) return buildSnapshot;
  const existing: Post[] = guides.map(guide => ({
    slug: guide.slug, title: guide.title, seoTitle: guide.seoTitle ?? guide.title,
    description: guide.description, category: category(guide.slug), tags: [], author: team,
    // Data de revisão não é prova de primeira publicação. Não inventar datePublished.
    updatedAt: guide.reviewedAt || "2026-07-25",
    markdown: [guide.answer, ...guide.sections.map(section => `## ${section.title}\n\n${section.body}${section.checklist ? "\n\n" + section.checklist.map(item => `- ${item}`).join("\n") : ""}`)].join("\n\n"),
    cover: { src: guideCover(guide.slug), alt: legacyAlts[guide.slug as keyof typeof legacyAlts], width: 1200, height: 630 },
    illustrations: [], related: guide.related,
    faq: [{ question: guide.title, answer: guide.answer }],
  }));
  const directory = path.join(process.cwd(), "content/guias");
  const incoming: Post[] = fs.readdirSync(directory).filter(file => file.endsWith(".md")).flatMap(file => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    if (!canPublish(data.status, data.data_prevista)) return [];
    const images = assets.filter(image => image.slug === data.slug);
    const cover = images.find(image => image.position === 1);
    if (!cover) throw new Error(`Guia aprovado sem capa revisada: ${data.slug}`);
    for (const image of images) {
      if (!image.alt.trim() || !fs.existsSync(path.join(process.cwd(), "public", image.src))) throw new Error(`Imagem ausente ou sem alt: ${image.src}`);
    }
    return [{
      slug: data.slug, title: data.titulo, seoTitle: data.title_seo, description: data.meta_description,
      category: data.pilar, tags: [data.puxa, data.bloco].filter(Boolean),
      publishedAt: data.data_publicacao || data.data_prevista, updatedAt: data.data_atualizacao || data.data_publicacao || data.data_prevista,
      author: data.autor === "Nicolas Avila" ? { name: "Nicolas Avila", type: "Person" as const, url: "/nicolas/", bio: "Fundador da Avila Ops Tecnologia, engenheiro civil de formação e desenvolvedor. Atua em produto, tecnologia e operação, criando sites, integrações e automações para pequenas empresas." } : team,
      markdown: content.replace(/^# .+\r?\n/m, "").trim(),
      cover: cover as EditorialImage, illustrations: images.filter(image => image.position === 2),
      related: data.links_internos || [],
      faq: [...(content.split(/^## Perguntas frequentes\s*$/m)[1] || "").matchAll(/\*\*([^\n]+?)\*\*\s*\n([\s\S]*?)(?=\n\s*\*\*|$)/g)].map(match => ({ question: match[1], answer: match[2].trim() })),
    }];
  });
  validatePosts(incoming, today());
  const merged = new Map(existing.map(post => [post.slug, post]));
  incoming.forEach(post => merged.set(post.slug, post));
  buildSnapshot = [...merged.values()].sort((a, b) => (b.publishedAt || b.updatedAt || "").localeCompare(a.publishedAt || a.updatedAt || "") || a.title.localeCompare(b.title, "pt-BR"));
  validatePosts(buildSnapshot, today());
  return buildSnapshot;
}
export const getPost = (slug: string) => getPosts().find(post => post.slug === slug);
export const getCategories = () => [...new Set(getPosts().map(post => post.category))].map(name => ({ name, slug: slugify(name) }));
