import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunAbiEncode } from "@/app/components/commands/run-abi-encode";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="ABI-encode the arguments for a call to someFunc(address,uint256):"
        command='cast abi-encode "someFunc(address,uint256)" 0xbd20e68967fc2a813356bff4754bba48692d8e0d 123'
        output="0x000000000000000000000000bd20e68967fc2a813356bff4754bba48692d8e0d000000000000000000000000000000000000000000000000000000000000007b"
      />

      <Example
        description="Parameters as a tuple:"
        command='cast abi-encode "someFunc((string,uint256))" "(myString,1)"'
        output="0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000086d79537472696e67000000000000000000000000000000000000000000000000"
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunAbiEncode />}
    />
  );
}
