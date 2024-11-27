import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Current client version (as of November 2024):"
        command="cast client"
        output="anvil/v0.2.0"
      />
    </>
  );

  return <CommandPageTemplate content={content} examples={typeof examples !== "undefined" ? examples : undefined} />;
}
