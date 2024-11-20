import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { lucario as darkTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  children: string;
  language: string;
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language }) => {
  return (
    <SyntaxHighlighter
      style={darkTheme}
      className="rounded-none"
      // language={language}
      language="shell"
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
  );
};
