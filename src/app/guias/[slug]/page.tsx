import { notFound } from "next/navigation";
import PostTemplate from "@/components/editorial/PostTemplate";
import { getPost, getPosts } from "@/lib/editorial/repository";
import { postMetadata } from "@/lib/editorial/seo";
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return getPosts().map(post => ({ slug: post.slug })); }
export async function generateMetadata({ params }: Props) { const post = getPost((await params).slug); return post ? postMetadata(post) : {}; }
export default async function Page({ params }: Props) { const post = getPost((await params).slug); if (!post) notFound(); return <PostTemplate post={post} />; }
