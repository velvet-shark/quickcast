import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunToHex } from "@/app/components/commands/run-to-hex";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example description="Convert to hex:" command="cast to-hex 255" output="0xff" />
      <Example description="Convert to hex:" command="cast to-hex 1234567890" output="0x499602d2" />
      <Example
        description="Default is converting from decimal but you can specify a different base. Binary here:"
        command="cast to-hex 1010 --base-in 2"
        output="0xa"
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunToHex />}
    />
  );
}
