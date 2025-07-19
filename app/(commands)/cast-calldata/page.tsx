import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { getMdxContent } from "@/app/lib/getMdxContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunCalldata } from "@/app/components/commands/run-calldata";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  // Try to get MDX content first, fall back to regular content if needed
  const mdxContent = await getMdxContent(`${dirName}.md`);
  const content = mdxContent ? null : await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Get the calldata for a function call:"
        command="cast calldata 'transfer(address,uint256)' 0xbd20e68967fc2a813356bff4754bba48692d8e0d 10000000000000000"
        output="0xa9059cbb000000000000000000000000bd20e68967fc2a813356bff4754bba48692d8e0d000000000000000000000000000000000000000000000000002386f26fc10000"
      />
      <Example
        description="Encode with different data types:"
        command='cast calldata "setDetails(string,address)" "Hello World" 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
        output="0x1a367de70000000000000000000000000000000000000000000000000000000000000040000000000000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcd000000000000000000000000000000000000000000000000000000000000000b48656c6c6f20576f726c64000000000000000000000000000000000000000000"
      />
    </>
  );

  return <CommandPageTemplate content={content} mdxContent={mdxContent} examples={examples} runCommand={<RunCalldata />} />;
}
