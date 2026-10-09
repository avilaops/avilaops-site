import RollTemplate, { rollMetadata } from "@/components/editorial/RollTemplate";
export const metadata = rollMetadata("/guias/");
export default function Page() { return <RollTemplate base="/guias/" />; }
