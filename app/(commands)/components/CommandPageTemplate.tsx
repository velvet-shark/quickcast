import { Metadata } from "next";
import { Markdown } from "@/app/components/Markdown";
import { getCommandMetadata } from "@/app/lib/getCommandMetadata";
import path from "path";

interface CommandPageTemplateProps {
  content: string | null;
  runCommand?: React.ReactNode;
  examples?: React.ReactNode;
}

export function CommandPageTemplate({ content, runCommand, examples }: CommandPageTemplateProps) {
  return (
    <>
      {/* Run command (Optional) */}
      {runCommand && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Try Online</h2>
          <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
            {runCommand}
          </section>
        </div>
      )}

      {/* Examples (Optional) */}
      {examples && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Examples</h2>
          <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
            <div className="space-y-6">{examples}</div>
          </section>
        </div>
      )}

      {/* Command Documentation */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Documentation</h2>
        <section className="bg-yellow-50 dark:bg-neutral-900 rounded-lg px-4 py-2 border dark:border-neutral-800">
          <div className="prose dark:prose-invert max-w-none">
            <Markdown content={content ?? ""} className="bg-yellow-50" />
          </div>
        </section>
      </div>
    </>
  );
}

export async function generateCommandMetadata(importMetaUrl: string): Promise<Metadata> {
  const dirName = path.basename(path.dirname(importMetaUrl));
  const { title, description } = getCommandMetadata(dirName);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}
