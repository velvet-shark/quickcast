import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";
import Image from "next/image";

export default async function Home() {
    const content = await getPageContent("cast.md");

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="sm:hidden mb-6 flex justify-center">
                <Image src="/quickcast-logo.svg" alt="QuickCast Logo" width={225} height={60} priority />
            </div>
            <p className="text-neutral-700 mb-4">
                <strong>quickcast.dev</strong> is a collection of examples and documentation for{" "}
                <span className="font-bold">cast</span>,{" "}
                <a href="https://getfoundry.sh/" className="text-blue-500 underline" target="_blank">
                    Foundry
                </a>
                &apos;s command-line tool for performing Ethereum RPC calls.
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
