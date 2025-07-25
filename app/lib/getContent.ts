import fs from "fs";
import path from "path";

function stripMdExtensions(text: string): string {
  return text.replaceAll(/\.md/g, "");
}

async function resolveInclude(
  basePath: string,
  includePath: string,
  seenPaths = new Set<string>()
): Promise<string | null> {
  // Prevent infinite recursion
  if (seenPaths.has(includePath)) {
    console.error(`Circular include detected: ${includePath}`);
    return null;
  }
  seenPaths.add(includePath);

  // Try relative to current file first
  let fullPath = path.join(path.dirname(basePath), includePath);
  let content: string | null = null;

  try {
    content = await fs.promises.readFile(fullPath, "utf8");
  } catch {
    // If not found, try from commands/vocs/docs/pages/cast/reference with proper extension handling
    try {
      const normalizeIncludePath = (p: string) => {
        // Handle relative paths in includes
        const relativePath = p.replace(/^\.\//, '');
        // Remove any existing .mdx or .md extension and add .mdx
        return relativePath.replace(/\.(mdx?)$/, '') + '.mdx';
      };
      
      fullPath = path.join(process.cwd(), "commands", "vocs", "docs", "pages", "cast", "reference", normalizeIncludePath(includePath));
      content = await fs.promises.readFile(fullPath, "utf8");
    } catch (innerError) {
      console.error(`Error reading include file ${includePath}:`, innerError);
      return null;
    }
  }

  // Process nested includes
  if (content) {
    const includeRegex = /{{#include ([^}]+)}}/g;
    const matches = content.matchAll(includeRegex);

    for (const match of matches) {
      const nestedIncludePath = match[1].trim();
      const nestedContent = await resolveInclude(fullPath, nestedIncludePath, seenPaths);
      if (nestedContent) {
        content = content.replace(match[0], nestedContent);
      }
    }
  }

  return content;
}

export async function getPageContent(pagePath: string) {
  // Special case for the overview page
  if (pagePath === 'cast.md') {
    const overviewPath = path.join(process.cwd(), "commands", "vocs", "docs", "pages", "cast", "reference", "cast.mdx");
    try {
      return await fs.promises.readFile(overviewPath, "utf8");
    } catch (error) {
      console.error("Error reading overview file:", error);
      return null;
    }
  }

  // Normalize path and ensure it has the correct extension for other pages
  const normalizePath = (p: string) => {
    // Remove any existing .mdx or .md extension
    const normalized = p.replace(/\.(mdx?)$/, '');
    // Remove cast- prefix if present
    const withoutPrefix = normalized.replace(/^cast-/, '');
    
    // Handle wallet subcommands (cast-wallet-address -> wallet/address)
    if (withoutPrefix.startsWith('wallet-')) {
      const subCommand = withoutPrefix.replace('wallet-', '');
      return `wallet/${subCommand}.mdx`;
    }
    
    // Handle tx-pool subcommands (cast-tx-pool-status -> tx-pool/status)
    if (withoutPrefix.startsWith('tx-pool-')) {
      const subCommand = withoutPrefix.replace('tx-pool-', '');
      return `tx-pool/${subCommand}.mdx`;
    }
    
    // Handle --create commands (cast-call---create -> call/--create)
    if (withoutPrefix.includes('---create')) {
      const baseCommand = withoutPrefix.replace('---create', '');
      return `${baseCommand}/--create.mdx`;
    }
    
    // Add .mdx extension
    return `${withoutPrefix}.mdx`;
  };
  
  const fullPath = path.join(process.cwd(), "commands", "vocs", "docs", "pages", "cast", "reference", normalizePath(pagePath));

  try {
    let content = await fs.promises.readFile(fullPath, "utf8");

    // Handle includes
    const includeRegex = /{{#include ([^}]+)}}/g;
    const matches = content.matchAll(includeRegex);

    for (const match of matches) {
      const includePath = match[1].trim();
      const includeContent = await resolveInclude(fullPath, includePath);
      if (includeContent) {
        content = content.replace(match[0], includeContent);
      }
    }

    return stripMdExtensions(content);
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}
