import { CodeBlock } from "./CodeBlock";

interface ExampleProps {
  description?: string;
  command: string;
  output: string | React.ReactNode;
}

export function Example({ description, command, output }: ExampleProps) {
  return (
    <div>
      {description && <div className="mb-2 text-sm text-neutral-500 dark:text-neutral-400">{description}</div>}
      <div className="space-y-2">
        <CodeBlock>{command}</CodeBlock>
        <div className="pl-4 py-2 text-sm border-l-2 border-green-500 bg-neutral-50 dark:bg-neutral-800/50">
          <div className="font-mono whitespace-pre">{output}</div>
        </div>
      </div>
    </div>
  );
}
