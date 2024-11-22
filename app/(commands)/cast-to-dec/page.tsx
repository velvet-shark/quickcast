import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";

export default async function CastToDecPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  const content = await getPageContent(`${dirName}.md`);

  return (
    <>
      {/* Section 1: Online Command Runner (Optional) */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Try Online</h2>
        <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
          {/* Add your command runner component here */}
        </section>
      </div>

      {/* Section 2: Examples */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Examples</h2>
        <section className="bg-white dark:bg-neutral-900 rounded-lg p-6 border dark:border-neutral-800">
          <div className="space-y-4">
            <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded-md">
              <code className="block mb-2">cast to-dec 0xff</code>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Output: <code>255</code>
              </div>
            </div>
            {/* Add more examples as needed */}
          </div>
        </section>
      </div>

      {/* Section 3: Command Documentation */}
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
