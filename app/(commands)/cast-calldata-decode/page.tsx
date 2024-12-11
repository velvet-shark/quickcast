import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunCalldataDecode } from "@/app/components/commands/run-calldata-decode";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  const examples = (
    <>
      <Example
        description="Decode input for a transfer function call, getting the address and the amount in return:"
        command='cast calldata-decode "transfer(address,uint256)" 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000'
        output={`0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0
39000000000000000 [3.9e16]`}
      />
      <Example
        description="Decode input for approve function call, getting the address and the amount in return:"
        command='cast calldata-decode "approve(address,uint256)" 0x095ea7b300000000000000000000000090c1f9220d90d3966fbee24045edd73e1d588ad500000000000000000000000000000000000000000000000000000000000003e8'
        output={`0x90c1f9220d90d3966FbeE24045EDd73E1d588aD5
1000`}
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunCalldataDecode />}
    />
  );
}
