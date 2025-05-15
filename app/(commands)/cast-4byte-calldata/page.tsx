import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { CommandPageTemplate, generateCommandMetadata } from "../components/CommandPageTemplate";
import { Example } from "@/app/components/Example";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  //   const examples = (
  //     <>
  //       <Example description="Description:" command="cast command arguments" output="output" />

  //       <Example
  //         description="Convert multiple values with --json:"
  //         command="cast to-dec --json 0xff 0xdeadbeef 0x1234"
  //         output={`{
  //   "0xff": "255",
  //   "0xdeadbeef": "3735928559",
  //   "0x1234": "4660"
  // }`}
  //       />
  //     </>
  //   );

  return <CommandPageTemplate content={content} examples={typeof examples !== "undefined" ? examples : undefined} />;
}
