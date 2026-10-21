import { readFile } from "fs/promises";
import path from "path";
import { Markdown } from "@/app/components/Markdown";

export const metadata = { title: "CLI reference versions | quickcast.dev" };

export default async function ReferenceVersionsPage() {
  const source = await readFile(
    path.join(process.cwd(), "commands/src/pages/reference/versions.mdx"),
    "utf8",
  );
  const content = source.replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "");
  return <article className="p-1 sm:p-6 max-w-4xl mx-auto"><Markdown content={content} /></article>;
}
