import { notFound } from "next/navigation";
import RollTemplate, { rollMetadata } from "@/components/editorial/RollTemplate";
import { getCategories, getPosts } from "@/lib/editorial/repository";
import { PAGE_SIZE } from "@/lib/editorial/model";
export const dynamicParams = false;
type Props = { params: Promise<{ category: string; page?: string }> };
export function generateStaticParams() { return getCategories().map(category => ({ category: category.slug })); }
export async function generateMetadata({ params }: Props) { const data = await params; const category = getCategories().find(item => item.slug === data.category); return rollMetadata(`/blog/categoria/${data.category}/`, Number(data.page || 1), category?.name); }
export default async function Page({ params }: Props) { const data = await params; const category = getCategories().find(item => item.slug === data.category); const page = Number(data.page || 1); if (!category || !Number.isInteger(page) || page < 1 || page > Math.ceil(getPosts().filter(post => post.category === category.name).length / PAGE_SIZE)) notFound(); return <RollTemplate base={`/blog/categoria/${data.category}/`} category={category.name} page={page} />; }
