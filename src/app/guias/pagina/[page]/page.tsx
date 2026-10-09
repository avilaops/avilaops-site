import { notFound } from "next/navigation";
import RollTemplate, { rollMetadata } from "@/components/editorial/RollTemplate";
import { getPosts } from "@/lib/editorial/repository";
import { PAGE_SIZE } from "@/lib/editorial/model";
export const dynamicParams = false;
export function generateStaticParams() { return Array.from({ length: Math.max(0, Math.ceil(getPosts().length / PAGE_SIZE) - 1) }, (_, i) => ({ page: String(i + 2) })); }
type Props = { params: Promise<{ page: string }> };
export async function generateMetadata({ params }: Props) { return rollMetadata("/guias/", Number((await params).page)); }
export default async function Page({ params }: Props) { const page = Number((await params).page); if (!Number.isInteger(page) || page < 2 || page > Math.ceil(getPosts().length / PAGE_SIZE)) notFound(); return <RollTemplate base="/guias/" page={page} />; }
