import RollTemplate, { rollMetadata } from "@/components/editorial/RollTemplate";
export const metadata = rollMetadata("/blog/");
export default function Page() { return <RollTemplate base="/blog/" />; }
