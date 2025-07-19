import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { getMdxContent } from "@/app/lib/getMdxContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  // Try to get MDX content first, fall back to regular content if needed
  const mdxContent = await getMdxContent(`${dirName}.md`);
  const content = mdxContent ? null : await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="When providing a RPC endpoint URL:"
        command="cast chain --rpc-url https://eth.llamarpc.com"
        output="ethlive"
      />
      <Example description="Works with -r too:" command="cast chain -r https://polygon-rpc.com" output="polygon" />
    </>
  );

  return <CommandPageTemplate content={content} mdxContent={mdxContent} examples={typeof examples !== "undefined" ? examples : undefined} />;
}
