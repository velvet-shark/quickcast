import { Metadata } from "next";
import { Markdown } from "@/app/components/Markdown";
import { getCommandMetadata } from "@/app/lib/getCommandMetadata";
import { Card } from "@/app/components/Card";
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
          {runCommand && <Card title="TRY ONLINE">{runCommand}</Card>}

          {/* Examples (Optional) */}
          {examples && (
            <Card title="EXAMPLES">
              <div className="space-y-6">{examples}</div>
            </Card>
          )}
        </div>
      )}

      {/* Command Documentation */}
      <Card title="DOCUMENTATION">
        <Markdown content={content ?? ""} />
      </Card>
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
