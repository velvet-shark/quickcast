import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";
import { Example } from "@/app/components/Example";

export default async function CastToDecPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  return (
    <>
      {/* Run command */}
      {/* <div>
      </div> */}

      {/* Examples */}
      {/* <div>
        <h2 className="text-2xl font-bold mb-2">Examples</h2>
        <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
          <div className="space-y-6">
            <Example description="Description:" command="cast command arguments" output="output" />
          </div>
        </section>
      </div> */}

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