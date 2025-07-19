import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { getMdxContent } from "@/app/lib/getMdxContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunUnit } from "@/app/components/commands/run-unit";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  // Try to get MDX content first, fall back to regular content if needed
  const mdxContent = await getMdxContent(`${dirName}.md`);
  const content = mdxContent ? null : await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Convert wei to ether:"
        command="cast from-wei 1230000000000000000"
        output="1.230000000000000000"
      />
      <Example
        description="Works with hex values too:"
        command="cast from-wei 0xde0b6b3a7640000"
        output="1.000000000000000000"
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      mdxContent={mdxContent}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunUnit />}
    />
  );
}
