import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunUnit } from "@/app/components/commands/run-unit";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Convert wei to ether:"
        command="cast to-unit 1000000000000000000 ether"
        output="1.000000000000000000"
      />
      <Example description="Convert wei to gwei:" command="cast to-unit 1000000000 gwei" output="1.000000000" />
      <Example
        description="Convert multiple values with --json:"
        command="cast to-unit --json 1000000000 1000000000000000000 gwei ether"
        output={`{
  "1000000000": "1.000000000",
  "1000000000000000000": "1.000000000000000000"
}`}
      />
    </>
  );

  return <CommandPageTemplate content={content} examples={examples} runCommand={<RunUnit />} />;
}
