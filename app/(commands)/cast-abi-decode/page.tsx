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
        description="Decode output data for a balanceOf call (if there's no parameter, then it decodes output data):"
        command='cast abi-decode "balanceOf(address)(uint256)" 0x000000000000000000000000000000000000000000000000000000000000000a'
        output="10"
      />

      <Example
        description="Decode input data for a transfer call (same as running `cast calldata-decode`):"
        command='cast abi-decode --input "transfer(address,uint256)" 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000
0x00000000E78388B4CE79068E89Bf8AA7F218ef6B'
        output="69968757479791728420194130618274621873781963541191066330122034508882829282891"
      />
    </>
  );

  return <CommandPageTemplate content={content} examples={typeof examples !== "undefined" ? examples : undefined} />;
}
