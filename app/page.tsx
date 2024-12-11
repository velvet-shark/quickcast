import { getPageContent } from "@/app/lib/getContent";
import { Markdown } from "@/app/components/Markdown";
import Image from "next/image";
import { Card } from "./components/Card";

export default async function Home() {
  const content = await getPageContent("cast.md");

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex justify-center">
        <Image src="/quickcast-logo.png" alt="QuickCast Logo" width={300} height={45} priority />
      </div>

      <div className="space-y-8 mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
            <code
              className="font-mono font-normal"
              style={{ color: "#00bb00", textShadow: "0 0 2px #00bb00, 0 0 5px #00bb00" }}
            >
              cast
            </code>{" "}
            commands at your fingertips
          </h1>
          <p className="text-lg text-neutral-600">
            Your guide to mastering{" "}
            <a href="https://getfoundry.sh/" className="text-blue-500 hover:text-blue-600 underline" target="_blank">
              Foundry&apos;s
            </a>{" "}
            <code className="text-blue-600 font-mono">cast</code> command-line tool
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card title="Lots of examples">
            <div className="mb-3 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Learn from real-world usage</h3>
            <p className="text-neutral-600">
              All the examples and options you ever wanted, or didn&apos;t even know existed. For every{" "}
              <code className="text-blue-600 font-mono">cast</code> command.
            </p>
          </Card>
          <Card title="Run commands online">
            <div className="mb-3 text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Execute without installation</h3>
            <p className="text-neutral-600">
              Run (some) <code className="text-blue-600 font-mono">cast</code> commands in your browser. No Foundry
              setup, no terminal needed.
            </p>
          </Card>
        </div>
      </div>

      <Card title="DOCUMENTATION">
        <Markdown content={content ?? ""} />
      </Card>
    </div>
  );
}
