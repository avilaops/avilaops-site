import assert from "node:assert/strict";
import { canPublish, getPosts } from "../src/lib/editorial/repository";
import { validatePosts } from "../src/lib/editorial/validation";

assert.equal(canPublish("aprovado", "2026-02-30", "2026-10-09"), false, "Data inexistente não pode liberar artigo");
assert.equal(canPublish("aprovado", "2026-10-10", "2026-10-09"), false);
assert.equal(canPublish("revisado", "2026-10-01", "2026-10-09"), false);
assert.equal(canPublish("aprovado", "2024-02-29", "2026-10-09"), true);
console.log("Política de publicação: datas reais e aprovação verificadas");
const post = { ...getPosts()[0], publishedAt: "2026-10-09", updatedAt: "2026-10-09" };
assert.throws(() => validatePosts([{ ...post, seoTitle: " " }], "2026-10-09"), /obrigatório/);
assert.throws(() => validatePosts([post, post], "2026-10-09"), /duplicado/);
assert.throws(() => validatePosts([{ ...post, publishedAt: "2026-10-10" }], "2026-10-09"), /futura/);
assert.throws(() => validatePosts([{ ...post, publishedAt: "2026-10-09", updatedAt: "2026-10-08" }], "2026-10-09"), /anterior/);
assert.throws(() => validatePosts([{ ...post, cover: { ...post.cover, alt: " " } }], "2026-10-09"), /descrição/);
assert.throws(() => validatePosts([{ ...post, cover: { ...post.cover, width: 0 } }], "2026-10-09"), /dimensões/);
console.log("Contrato CMS: duplicidade, datas, alt e dimensões verificados");
