import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunToDec } from "@/app/components/commands/run-to-dec";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example description="Convert to decimal:" command="cast to-dec ff" output="255" />
      <Example description="Works with or without 0x prefix:" command="cast to-dec 0xff" output="255" />
      <Example
        description="Default is converting from hex but you can specify a different base. Binary here:"
        command="cast to-dec 1010 --base-in 2"
        output="10"
      />
      <Example description="Base 16:" command="cast to-dec 0x1a2b3c4d5e6f --base-in 16" output="28772997619311" />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunToDec />}
    />
  );
}
