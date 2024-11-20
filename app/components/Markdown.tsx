import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "./CodeBlock";

type MarkdownProps = {
  content: string;
  className?: string;
};

export function Markdown({ content, className = "" }: MarkdownProps) {
  return (
    <ReactMarkdown
      className={`min-h-dvh bg-white dark:bg-[#1e1e1e] w-full max-w-4xl text-md ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-4 mt-6" {...props} />,
        h2: ({ ...props }) => (
          <>
            <h2 className="text-3xl font-bold mb-3 mt-5" {...props} />
            <hr className="border-t border-gray-200 dark:border-gray-700 my-2" />
          </>
        ),
        h3: ({ ...props }) => <h3 className="text-2xl font-semibold mb-2 mt-3" {...props} />,
        h4: ({ ...props }) => <h3 className="text-xl font-semibold mb-2 mt-3" {...props} />,
        h5: ({ ...props }) => <h3 className="text-lg font-semibold mb-2 mt-3" {...props} />,
        p: ({ ...props }) => <p className="my-2 leading-6" {...props} />,
        em: ({ ...props }) => <em className="italic" {...props} />,
        del: ({ ...props }) => <del className="line-through" {...props} />,
        a: ({ ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
        img: ({ ...props }) => <img className="max-w-full h-auto my-4 rounded" {...props} />,
        pre: ({ ...props }) => <pre className="bg-transparent border-none" {...props} />,
        table: ({ ...props }) => <table className="border-collapse my-4 border" {...props} />,
        thead: ({ ...props }) => <thead className="bg-gray-200 dark:bg-gray-700" {...props} />,
        tbody: ({ ...props }) => <tbody {...props} />,
        tr: ({ ...props }) => <tr className="border-b border-gray-300 dark:border-gray-600" {...props} />,
        td: ({ ...props }) => <td className="px-4 py-2" {...props} />,
        th: ({ ...props }) => <th className="px-4 py-2 font-semibold text-left" {...props} />,
        ul: ({ ...props }) => <ul className="list-disc pl-4 my-4 space-y-2" {...props} />,
        ol: ({ ...props }) => <ol className="list-decimal pl-4 my-4 space-y-2" {...props} />,
        li: ({ ...props }) => (
          <li className="pl-2">
            <span className="inline">{props.children}</span>
          </li>
        ),
        blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />,
        code: (props) => {
          const { children, className } = props;
          const isMultiLine = children!.toString().includes("\n");

          if (!isMultiLine) {
            return (
              <code className="bg-[#eef] dark:bg-[#3a3a4d] text-[#9b5af7] dark:text-[#c9dcff] rounded px-1 py-0.5">
                {children}
              </code>
            );
          }

          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "javascript";
          return <CodeBlock language={language}>{children as string}</CodeBlock>;
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
