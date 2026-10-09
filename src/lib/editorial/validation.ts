import type { Post } from "./model";

export function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

/** Valida o contrato público, independentemente da origem local ou CMS. */
export function validatePosts(posts: Post[], today: string) {
  const slugs = new Set<string>();
  for (const post of posts) {
    const require = (ok: unknown, field: string) => {
      if (!ok) throw new Error(`Artigo ${post.slug}: ${field}`);
    };
    require(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug) && !slugs.has(post.slug), "slug inválido ou duplicado");
    slugs.add(post.slug);
    for (const field of [post.title, post.seoTitle, post.description, post.category, post.markdown, post.author.name, post.author.bio, post.author.url]) require(typeof field === "string" && field.trim(), "campo obrigatório vazio");
    for (const date of [post.publishedAt, post.updatedAt]) {
      if (date !== undefined) require(validDate(date) && date <= today, "data inválida ou futura");
    }
    if (post.publishedAt && post.updatedAt) require(post.updatedAt >= post.publishedAt, "revisão anterior à publicação");
    for (const image of [post.cover, ...post.illustrations]) {
      require(image.alt?.trim(), "imagem sem descrição");
      require(Number.isInteger(image.width) && image.width > 0 && Number.isInteger(image.height) && image.height > 0, "dimensões de imagem inválidas");
      require(image.src.startsWith("/") && !image.src.startsWith("//") && !image.src.split("/").includes(".."), "caminho de imagem inválido");
    }
  }
}
