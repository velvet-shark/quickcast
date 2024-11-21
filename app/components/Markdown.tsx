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
            className={`min-h-dvh bg-white w-full max-w-4xl text-md leading-relaxed ${className}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
                h1: ({ ...props }) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props} />,
                h2: ({ ...props }) => (
                    <>
                        <h2 className="text-3xl font-bold mb-4 mt-6" {...props} />
                        <hr className="border-t border-gray-200 mb-4" />
                    </>
                ),
                h3: ({ ...props }) => <h3 className="text-2xl font-semibold mb-3 mt-5" {...props} />,
                h4: ({ ...props }) => <h4 className="text-xl font-semibold mb-3 mt-4" {...props} />,
                h5: ({ ...props }) => <h5 className="text-lg font-semibold mb-2 mt-4" {...props} />,
                p: ({ ...props }) => <p className="my-4 leading-7" {...props} />,
                em: ({ ...props }) => <em className="italic" {...props} />,
                del: ({ ...props }) => <del className="line-through" {...props} />,
                a: ({ ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
                img: ({ ...props }) => <img className="max-w-full h-auto my-6 rounded-lg shadow-sm" {...props} />,
                pre: ({ ...props }) => <pre className="bg-transparent border-none my-4" {...props} />,
                table: ({ ...props }) => (
                    <table className="border-collapse my-6 w-full border rounded-lg overflow-hidden" {...props} />
                ),
                thead: ({ ...props }) => <thead className="bg-gray-100" {...props} />,
                tbody: ({ ...props }) => <tbody {...props} />,
                tr: ({ ...props }) => <tr className="border-b border-gray-200 hover:bg-gray-50" {...props} />,
                td: ({ ...props }) => <td className="px-6 py-3" {...props} />,
                th: ({ ...props }) => <th className="px-6 py-3 font-semibold text-left bg-gray-100" {...props} />,
                ul: ({ ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
                li: ({ ...props }) => (
                    <li className="pl-2">
                        <span className="inline">{props.children}</span>
                    </li>
                ),
                blockquote: ({ ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-6 py-2 my-4 bg-gray-50 rounded-r" {...props} />
                ),
                code: (props) => {
                    const { children, className } = props;
                    const isMultiLine = children!.toString().includes("\n");

                    if (!isMultiLine) {
                        return (
                            <code className="bg-gray-100 text-gray-800 rounded px-2 py-1 text-sm font-mono">
                                {children}
                            </code>
                        );
                    }

                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "bash";
                    return <CodeBlock language={language}>{children as string}</CodeBlock>;
                }
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
