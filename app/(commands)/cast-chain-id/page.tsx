import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";
import { Example } from "@/app/components/Example";
import { getCommandMetadata } from "@/app/lib/getCommandMetadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const dirName = path.basename(path.dirname(import.meta.url));
  const { title, description } = getCommandMetadata(dirName);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article"
    },
    twitter: {
      card: "summary",
      title,
      description
    }
  };
}

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  return (
    <>
      {/* Run command */}
      {/* <div>
      </div> */}

      {/* Examples */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Examples</h2>
        <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
          <div className="space-y-6">
            <Example description="When you are connected to a local node:" command="cast chain-id" output="31337" />
            <Example
              description="When providing a RPC endpoint URL:"
              command="cast chain-id --rpc-url https://rpc.sepolia.org/"
              output="11155111"
            />
            <Example description="Works with -r too:" command="cast chain-id -r https://polygon-rpc.com" output="137" />
          </div>
        </section>
      </div>

      {/* Command Documentation */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Documentation</h2>
        <section className="bg-yellow-50 dark:bg-neutral-900 rounded-lg px-4 py-2 border dark:border-neutral-800">
          <div className="prose dark:prose-invert max-w-none">
            <Markdown content={content ?? ""} className="bg-yellow-50" />
          </div>
        </section>
      </div>
    </>
  );
}
