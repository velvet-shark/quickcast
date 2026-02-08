import fs from "fs";
import path from "path";

function stripMdExtensions(text: string): string {
  return text.replaceAll(/\.md/g, "");
}

function stripDirectives(text: string): string {
  return text.replace(/^:::\w*$/gm, "");
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
    // If not found, try from commands/src/pages/reference/cast with proper extension handling
    try {
      const normalizeIncludePath = (p: string) => {
        // Handle relative paths in includes
        const relativePath = p.replace(/^\.\//, '');
        // Remove any existing .mdx or .md extension and add .mdx
        return relativePath.replace(/\.(mdx?)$/, '') + '.mdx';
      };

      fullPath = path.join(process.cwd(), "commands", "src", "pages", "reference", "cast", normalizeIncludePath(includePath));
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

// Build a prioritized list of possible relative paths for a command page.
// This makes nested command folders (e.g. erc20-token/allowance) resolve correctly.
function buildCandidatePaths(pagePath: string): string[] {
  const candidates = new Set<string>();
  const normalized = pagePath.replace(/\.(mdx?)$/, "");
  const withoutPrefix = normalized.replace(/^cast-/, "");
  const parts = withoutPrefix.split("-");

  // Existing specific mappings
  if (withoutPrefix.startsWith("wallet-")) {
    const subCommand = withoutPrefix.replace("wallet-", "");
    candidates.add(`wallet/${subCommand}.mdx`);
  }

  if (withoutPrefix.startsWith("tx-pool-")) {
    const subCommand = withoutPrefix.replace("tx-pool-", "");
    candidates.add(`tx-pool/${subCommand}.mdx`);
  }

  if (withoutPrefix.includes("---create")) {
    const baseCommand = withoutPrefix.replace("---create", "");
    candidates.add(`${baseCommand}/--create.mdx`);
  }

  // Default flat file
  candidates.add(`${withoutPrefix}.mdx`);

  // Generic nested mappings:
  // Try progressively grouping leading segments into a directory and the rest as filename.
  if (parts.length >= 2) {
    candidates.add(`${parts[0]}/${parts.slice(1).join("-")}.mdx`);
  }
  if (parts.length >= 3) {
    candidates.add(`${parts.slice(0, 2).join("-")}/${parts.slice(2).join("-")}.mdx`);
  }
  if (parts.length >= 4) {
    candidates.add(`${parts.slice(0, 3).join("-")}/${parts.slice(3).join("-")}.mdx`);
  }

  return Array.from(candidates);
}

export async function getPageContent(pagePath: string) {
  // Special case for the overview page
  if (pagePath === "cast.md") {
    const overviewPath = path.join(process.cwd(), "commands", "src", "pages", "reference", "cast", "cast.mdx");
    try {
      return await fs.promises.readFile(overviewPath, "utf8");
    } catch (error) {
      console.error("Error reading overview file:", error);
      return null;
    }
  }

  const referenceRoot = path.join(process.cwd(), "commands", "src", "pages", "reference", "cast");
  const candidatePaths = buildCandidatePaths(pagePath);

  for (const candidate of candidatePaths) {
    const fullPath = path.join(referenceRoot, candidate);
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

      return stripDirectives(stripMdExtensions(content));
    } catch (error) {
      // Try next candidate
    }
  }

  console.error("Error reading file: no matching path for", pagePath);
  return null;
}
