import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyButton } from "./CopyButton";

type CodeBlockProps = {
  children: string;
  language: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  return (
    <div className="relative group font-mono">
      <div className="absolute right-0 top-0 p-2 z-10">
        <CopyButton text={children} />
      </div>
      <SyntaxHighlighter
        style={theme}
        className="rounded-none !pr-12"
        // language={language}
        language="shell"
        customStyle={{
          fontFamily: "var(--font-mono)",
          margin: 0,
          fontSize: "0.875rem",
          lineHeight: "1.25rem"
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono)"
          }
        }}
        lineProps={{
          style: {
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            fontFamily: "var(--font-mono)"
          }
        }}
        wrapLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
