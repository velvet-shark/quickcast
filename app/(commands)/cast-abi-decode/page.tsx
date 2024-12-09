import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";
import { RunAbiDecode } from "@/app/components/commands/run-abi-decode";

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
        description="Decode output data for getReserves() functions (no parameters) that returns three uint values:"
        command="cast abi-decode 'getReserves()(uint112,uint112,uint32)' 0x000000000000000000000000000000000000000000000000001a8908b3ee4280000000000000000000000000000000000000000000000000003ff289d54a6380000000000000000000000000000000000000000000000000000000006579add4"
        output={`7469019865956992 [7.469e15]
17999597335634816 [1.799e16]
1702473172 [1.702e9]`}
      />
      <Example
        description="Decode output data for getValidators() functions (no parameters) that returns an array of addresses:"
        command='cast abi-decode "getValidators()(address[])" 0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001234567890123456789012345678901234567890000000000000000000000000abcdefabcdefabcdefabcdefabcdefabcdefabcd'
        output="[0x1234567890123456789012345678901234567890, 0xABcdEFABcdEFabcdEfAbCdefabcdeFABcDEFabCD]"
      />

      <Example
        description="Decode input data for a transfer call (same as running `cast calldata-decode`):"
        command='cast abi-decode --input "transfer(address,uint256)" 0xa9059cbb0000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0000000000000000000000000000000000000000000000000008a8e4b1a3d8000'
        output={`0xE78388b4CE79068e89Bf8aA7f218eF6b9AB0e9d0
39000000000000000 [3.9e16]`}
      />
    </>
  );

  return (
    <CommandPageTemplate
      content={content}
      examples={typeof examples !== "undefined" ? examples : undefined}
      runCommand={<RunAbiDecode />}
    />
  );
}
