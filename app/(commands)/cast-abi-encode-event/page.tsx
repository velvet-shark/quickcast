import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { getMdxContent } from "@/app/lib/getMdxContent";
import { generateCommandMetadata } from "../components/CommandPageTemplate";
import { CommandPageTemplateWithCustomizations } from "../components/CommandPageTemplateWithCustomizations";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  // Try to get MDX content first, fall back to regular content if needed
  const mdxContent = await getMdxContent(`${dirName}.md`);
  const content = mdxContent ? null : await getPageContent(`${dirName}.md`);

  return (
    <CommandPageTemplateWithCustomizations
      commandPath={dirName}
      content={content}
      mdxContent={mdxContent}
    />
  );
}
