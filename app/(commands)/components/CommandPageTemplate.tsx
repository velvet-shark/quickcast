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
  const hasTopContent = runCommand || examples;

  return (
    <>
      {/* Only render this div if there's top content */}
      {hasTopContent && (
        <div className="space-y-6">
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
        </div>
      )}

      {/* Command Documentation */}
      <div className={`-mx-6 sm:-mx-8 md:-mx-12 lg:-mx-24 ${!hasTopContent ? "-mt-4 sm:-mt-6" : ""}`}>
        <div className="bg-yellow-50 border-y">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 md:px-12 lg:px-24 py-12">
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="prose dark:prose-invert max-w-none">
              <Markdown content={content ?? ""} className="bg-yellow-50" />
            </div>
          </div>
        </div>
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
