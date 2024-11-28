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
      <SyntaxHighlighter
        style={theme}
        className="rounded-none"
        // language={language}
        language="shell"
        customStyle={{
          fontFamily: "var(--font-mono)"
        }}
        codeTagProps={{
          style: {
            fontFamily: "inherit"
          }
        }}
        lineProps={{
          style: {
            wordBreak: "break-word",
            whiteSpace: "pre-wrap"
          }
        }}
        wrapLines={true}
      >
        {children}
      </SyntaxHighlighter>
      <div className="absolute right-2 top-2">
        <CopyButton text={children} />
      </div>
    </div>
  );
};
