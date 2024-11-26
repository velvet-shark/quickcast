import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        code: CodeBlock,
        h1: ({ node, ...props }) => <h1 className="text-2xl sm:text-3xl font-bold mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-xl sm:text-2xl font-bold mb-2" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-lg sm:text-xl font-bold mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, href, ...props }) => (
          <a
            href={href}
            className="text-blue-500 hover:text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
