import { MDXRemote } from 'next-mdx-remote/rsc';
import { MdxContent } from '@/app/lib/getMdxContent';
import { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';

// Custom components for MDX rendering
const mdxComponents: MDXComponents = {
  // Map HTML elements to custom components
  h1: ({ children, ...props }) => <h1 className="text-4xl font-bold mb-6 mt-8" {...props}>{children}</h1>,
  h2: ({ children, ...props }) => (
    <>
      <h2 className="text-3xl font-bold mb-4 mt-2" {...props}>{children}</h2>
      <hr className="border-t border-gray-200 mb-4" />
    </>
  ),
  h3: ({ children, ...props }) => <h3 className="text-2xl font-semibold mb-3 mt-5" {...props}>{children}</h3>,
  h4: ({ children, ...props }) => <h4 className="text-xl font-semibold mb-3 mt-4" {...props}>{children}</h4>,
  h5: ({ children, ...props }) => <h5 className="text-lg font-semibold mb-2 mt-4" {...props}>{children}</h5>,
  p: ({ children, ...props }) => <p className="my-4 leading-7" {...props}>{children}</p>,
  em: ({ children, ...props }) => <em className="italic" {...props}>{children}</em>,
  del: ({ children, ...props }) => <del className="line-through" {...props}>{children}</del>,
  a: ({ href, children, ...props }) => {
    // Handle internal links
    if (href && href.startsWith('/')) {
      return <Link href={href} className="text-blue-500 hover:underline" {...props}>{children}</Link>;
    }
    // External links
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-500 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  img: ({ ...props }) => <img className="max-w-full h-auto my-6 rounded-lg shadow-sm" {...props} />,
  pre: ({ children, ...props }) => {
    // Handle code blocks
    if (children && typeof children === 'object' && 'props' in children) {
      const codeProps = children.props;
      const className = codeProps?.className || '';
      const match = /language-(\w+)/.exec(className);
      const language = match ? match[1] : 'bash';
      const codeContent = codeProps?.children;
      
      if (typeof codeContent === 'string') {
        return <CodeBlock language={language}>{codeContent.trim()}</CodeBlock>;
      }
    }
    
    return <pre className="bg-transparent border-none my-4" {...props}>{children}</pre>;
  },
  code: ({ children, className, ...props }) => {
    // Check if this is inline code or part of a code block
    const isMultiLine = children && children.toString().includes("\n");
    
    if (!isMultiLine && !className) {
      // Inline code
      return (
        <code className="bg-gray-100 text-gray-800 rounded px-2 py-1 text-sm" {...props}>
          {children}
        </code>
      );
    }
    
    // Code block - will be handled by pre element
    return <code className={className} {...props}>{children}</code>;
  },
  table: ({ children, ...props }) => (
    <table className="border-collapse my-6 w-full border rounded-lg overflow-hidden" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }) => <thead className="bg-gray-100" {...props}>{children}</thead>,
  tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
  tr: ({ children, ...props }) => <tr className="border-b border-gray-200 hover:bg-gray-50" {...props}>{children}</tr>,
  td: ({ children, ...props }) => <td className="px-6 py-3" {...props}>{children}</td>,
  th: ({ children, ...props }) => <th className="px-6 py-3 font-semibold text-left bg-gray-100" {...props}>{children}</th>,
  ul: ({ children, ...props }) => <ul className="list-disc pl-6 my-4 space-y-2" {...props}>{children}</ul>,
  ol: ({ children, ...props }) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>{children}</ol>,
  li: ({ children, ...props }) => (
    <li className="pl-2" {...props}>
      <span className="inline">{children}</span>
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-gray-300 pl-6 py-2 my-4 bg-gray-50 rounded-r" {...props}>
      {children}
    </blockquote>
  ),
};

interface MdxRendererProps {
  mdxContent: MdxContent;
}

export function MdxRenderer({ mdxContent }: MdxRendererProps) {
  // Create a components object that includes imported MDX components
  // We need to create this first so nested components can reference each other
  const componentsWithImports: MDXComponents = {
    ...mdxComponents,
  };
  
  // Add all imported components, making sure they have access to all other components
  Object.entries(mdxContent.components).forEach(([name, content]) => {
    componentsWithImports[name] = () => (
      <MDXRemote 
        source={content} 
        components={componentsWithImports} // Pass all components including other imports
      />
    );
  });

  return (
    <MDXRemote 
      source={mdxContent.content} 
      components={componentsWithImports}
    />
  );
}