import { Metadata } from "next";
import { Markdown } from "@/app/components/Markdown";
import { MdxRenderer } from "@/app/components/MdxRenderer";
import { getCommandMetadata } from "@/app/lib/getCommandMetadata";
import { Card } from "@/app/components/Card";
import { MdxContent } from "@/app/lib/getMdxContent";
import path from "path";

interface CommandPageTemplateProps {
  content: string | null;
  mdxContent?: MdxContent | null;
  runCommand?: React.ReactNode;
  examples?: React.ReactNode;
}

export function CommandPageTemplate({ content, mdxContent, runCommand, examples }: CommandPageTemplateProps) {
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
        {mdxContent ? (
          <MdxRenderer mdxContent={mdxContent} />
        ) : (
          <Markdown content={content ?? ""} />
        )}
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
      type: "article",
      url: `https://quickcast.dev/${dirName}`,
      siteName: "QuickCast",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${title} - QuickCast Command Documentation`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@velvet_shark"
    }
  };
}
