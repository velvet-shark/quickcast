import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <h1 className="text-4xl font-bold">
          Quick<code className="bg-neutral-100 dark:bg-neutral-900 px-1 rounded">cast</code>.dev
        </h1>
      </main>
    </div>
  );
}
