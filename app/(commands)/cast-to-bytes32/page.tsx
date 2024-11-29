import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunBytes32 } from "./run-bytes32";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Just adds zeros to the hex string on the right, until it is 32 bytes (hex can be with or without 0x):"
        command="cast to-bytes32 0x1"
        output="0x1000000000000000000000000000000000000000000000000000000000000000"
      />
      <Example
        description="It needs to be a hex string, it won't work with normal strings, e.g. it will work with '1234abc' but won't work with '1234xyz':"
        command="cast to-bytes32 1234abc"
        output="0x1234abc000000000000000000000000000000000000000000000000000000000"
      />
      <Example
        description="Often used to right pad zeros to addresses, for example when the address needs to be 32 bytes:"
        command="cast to-bytes32 0xbd20e68967fc2a813356bff4754bba48692d8e0d"
        output="0xbd20e68967fc2a813356bff4754bba48692d8e0d000000000000000000000000"
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunBytes32 />}
    />
  );
}
