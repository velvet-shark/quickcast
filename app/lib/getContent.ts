import fs from "fs";
import path from "path";

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
    // If not found, try from commands/src/reference/common
    try {
      fullPath = path.join(process.cwd(), "commands", "src", "reference", "common", includePath);
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
  const fullPath = path.join(process.cwd(), "commands", "src", "reference", "cast", pagePath);

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

    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}
