/** Contrato independente do CMS. Nunca retornar rascunhos no adaptador público. */
export type EditorialImage = {
  src: string; alt: string; width: number; height: number;
  section?: string; position?: number;
};
export type Post = {
  slug: string; title: string; seoTitle: string; description: string;
  category: string; tags: string[]; markdown: string;
  author: { name: string; url: string; bio: string; type: "Person" | "Organization" };
  publishedAt?: string; updatedAt?: string;
  cover: EditorialImage; illustrations: EditorialImage[]; related: string[];
  faq?: { question: string; answer: string }[];
};
export const PAGE_SIZE = 9;
export const listingPreviewPath = (base: string, page = 1) => `/og/editorial/${base.replace(/^\/+|\/+$/g, "").replaceAll("/", "-")}-pagina-${page}-v1.jpg`;
export const slugify = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const postPath = (post: Pick<Post, "slug">) => `/guias/${post.slug}/`;
export const readingMinutes = (post: Post) => Math.max(1, Math.ceil(post.markdown.trim().split(/\s+/).length / 190));
export const headingId = (text: string, index: number) => `${slugify(text)}-${index}`;
export const headings = (post: Post) => [...post.markdown.matchAll(/^## (.+)$/gm)].map((match, index) => ({ title: match[1], id: headingId(match[1], index) }));
