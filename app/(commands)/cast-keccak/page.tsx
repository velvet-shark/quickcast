import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunKeccak } from "@/app/components/commands/run-keccak";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Hashes whatever you give it with keccak256:"
        command='cast keccak "I tried auditioning at the foundry, but they said: Sorry, we only cast iron."'
        output="0x83ee1d1103f1f612ae164e30f597409cbebed0c5168f31b12cce1a0fc0f90bf3"
      />
      <Example
        description="Useful for getting the function selector of a function signature. Just pass the function signature as a string and get the first 4 bytes of the hash:"
        command='cast keccak "transfer(address,uint256)"'
        output="0xa9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"
      />
      <Example
        description="Works with hex values too:"
        command="cast keccak 0x1234"
        output="0x56570de287d73cd1cb6092bb8fdee6173974955fdef345ae579ee9f475ea7432"
      />
    </>
  );

  return <CommandPageTemplate content={content} examples={examples} runCommand={<RunKeccak />} />;
}
