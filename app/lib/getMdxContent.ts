import fs from "fs";
import path from "path";

export interface MdxImport {
  componentName: string;
  importPath: string;
  resolvedPath: string;
  content?: string;
}

export interface MdxContent {
  content: string;
  imports: MdxImport[];
  components: Record<string, string>;
}

// Parse MDX import statements at the beginning of the file
function parseMdxImports(content: string, basePath: string): { imports: MdxImport[], contentWithoutImports: string } {
  const imports: MdxImport[] = [];
  const lines = content.split('\n');
  let importEndIndex = 0;
  
  // Find all import statements at the beginning
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ')) {
      const importMatch = line.match(/import\s+(\w+)\s+from\s+["']([^"']+)["'];?/);
      if (importMatch) {
        const [_, componentName, importPath] = importMatch;
        
        // Resolve the import path relative to the current file
        const resolvedPath = resolveMdxImportPath(basePath, importPath);
        
        imports.push({
          componentName,
          importPath,
          resolvedPath
        });
      }
      importEndIndex = i + 1;
    } else if (line && !line.startsWith('import ')) {
      // Stop when we hit non-import content
      break;
    } else if (!line) {
      // Empty lines between imports
      importEndIndex = i + 1;
    }
  }
  
  // Return content without imports
  const contentWithoutImports = lines.slice(importEndIndex).join('\n').trim();
  
  return { imports, contentWithoutImports };
}

// Resolve MDX import path relative to the importing file
function resolveMdxImportPath(basePath: string, importPath: string): string {
  const baseDir = path.dirname(basePath);
  
  // Handle relative paths
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    return path.resolve(baseDir, importPath);
  }
  
  // For absolute imports (shouldn't happen in this codebase based on analysis)
  return importPath;
}

// Load content for imported MDX components
async function loadImportedComponents(imports: MdxImport[], allComponents: Record<string, string> = {}): Promise<Record<string, string>> {
  const components: Record<string, string> = { ...allComponents };
  
  for (const imp of imports) {
    try {
      let content = await fs.promises.readFile(imp.resolvedPath, 'utf8');
      
      // Process nested imports recursively
      const { imports: nestedImports, contentWithoutImports } = parseMdxImports(content, imp.resolvedPath);
      
      // First load nested components if any
      if (nestedImports.length > 0) {
        const nestedComponents = await loadImportedComponents(nestedImports, components);
        Object.assign(components, nestedComponents);
      }
      
      // Store the component content
      components[imp.componentName] = contentWithoutImports;
      imp.content = contentWithoutImports;
    } catch (error) {
      console.error(`Error loading imported component ${imp.componentName} from ${imp.resolvedPath}:`, error);
      // Store empty content on error
      components[imp.componentName] = `<!-- Error loading ${imp.componentName} -->`;
    }
  }
  
  return components;
}

// Process includes (backward compatibility with {{#include}} syntax)
async function processIncludes(
  content: string,
  basePath: string,
  seenPaths = new Set<string>()
): Promise<string> {
  const includeRegex = /{{#include ([^}]+)}}/g;
  const matches = Array.from(content.matchAll(includeRegex));
  
  for (const match of matches) {
    const includePath = match[1].trim();
    
    // Prevent circular includes
    if (seenPaths.has(includePath)) {
      console.error(`Circular include detected: ${includePath}`);
      continue;
    }
    
    seenPaths.add(includePath);
    
    // Try to resolve the include
    const fullPath = path.resolve(path.dirname(basePath), includePath);
    
    try {
      let includeContent = await fs.promises.readFile(fullPath, 'utf8');
      
      // Process nested includes
      includeContent = await processIncludes(includeContent, fullPath, new Set(seenPaths));
      
      // Replace the include with the content
      content = content.replace(match[0], includeContent);
    } catch (error) {
      console.error(`Error reading include file ${includePath}:`, error);
      content = content.replace(match[0], `<!-- Error loading include: ${includePath} -->`);
    }
  }
  
  return content;
}

// Strip .md extensions from content (backward compatibility)
function stripMdExtensions(text: string): string {
  return text.replaceAll(/\.md(?!x)/g, "");
}

// Main function to get MDX content with imports
export async function getMdxContent(pagePath: string): Promise<MdxContent | null> {
  // Special case for the overview page
  if (pagePath === 'cast.md' || pagePath === 'cast') {
    pagePath = 'cast.mdx';
  }
  
  // Normalize path and ensure it has the correct extension
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
    
    // Add .mdx extension
    return `${withoutPrefix}.mdx`;
  };
  
  const fullPath = path.join(
    process.cwd(), 
    "commands", 
    "vocs", 
    "docs", 
    "pages", 
    "cast", 
    "reference", 
    normalizePath(pagePath)
  );
  
  try {
    // Read the main file
    let content = await fs.promises.readFile(fullPath, "utf8");
    
    // Parse MDX imports
    const { imports, contentWithoutImports } = parseMdxImports(content, fullPath);
    
    // Load imported components
    const components = await loadImportedComponents(imports);
    
    // Process any remaining includes in the main content
    let processedContent = await processIncludes(contentWithoutImports, fullPath);
    
    // Strip .md extensions (backward compatibility)
    processedContent = stripMdExtensions(processedContent);
    
    return {
      content: processedContent,
      imports,
      components
    };
  } catch (error) {
    console.error("Error reading MDX file:", error);
    return null;
  }
}