import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./CopyButton";

interface Props {
  children: string;
  className?: string;
  language?: string;
}

export function CodeBlock({ children, className, language }: Props) {
  const match = /language-(\w+)/.exec(className || "");
  const lang = language || match?.[1] || "text";

  return (
    <div className="relative group font-mono">
      <SyntaxHighlighter
        language={lang}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          padding: "1rem"
        }}
      >
        {children}
      </SyntaxHighlighter>
      <div className="absolute right-2 top-2">
        <CopyButton text={children} />
      </div>
    </div>
  );
}
