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
      <Example description="When you are connected to a local node:" command="cast chain-id" output="31337" />
      <Example
        description="When providing a RPC endpoint URL:"
        command="cast chain-id --rpc-url https://rpc.sepolia.org/"
        output="11155111"
      />
      <Example description="Works with -r too:" command="cast chain-id -r https://polygon-rpc.com" output="137" />
    </>
  );

  return <CommandPageTemplate content={content} mdxContent={mdxContent} examples={typeof examples !== "undefined" ? examples : undefined} />;
}
