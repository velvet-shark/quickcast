import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";

export default async function Home() {
  const content = await getPageContent("cast.md");

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Cast: The Ethereum CLI Swiss Army Knife</h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-4">
        This site is a collection of examples and documentation for <span className="font-bold">cast</span>,{" "}
        <a href="https://getfoundry.sh/" className="text-blue-500 underline" target="_blank">
          Foundry
        </a>
        ’s command-line tool for performing Ethereum RPC calls.
      </p>

      <h2 className="text-2xl font-bold mb-2 mt-8">Documentation</h2>
      <section className="bg-yellow-50 dark:bg-neutral-900 rounded-lg px-4 py-2 border dark:border-neutral-800">
        <div className="prose dark:prose-invert max-w-none">
          <Markdown content={content ?? ""} className="bg-yellow-50" />
        </div>
      </section>
    </div>
  );
}
