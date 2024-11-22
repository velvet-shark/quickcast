import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";

export default async function Home() {
  const content = await getPageContent("cast.md");

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">What&apos;s this site about</h1>
      <div className="prose dark:prose-invert max-w-none">
        <Markdown content={content ?? ""} />
      </div>
    </div>
  );
}
