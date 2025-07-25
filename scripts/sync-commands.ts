import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

// Types for the sidebar structure
interface SidebarItem {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: SidebarItem[];
}

interface Command {
  name: string;
  link: string;
  category: string;
  path: string; // e.g., "cast-4byte" or "cast-wallet-address"
}

// Parse the cast-cli-reference.ts file
async function parseSidebarFile(): Promise<SidebarItem> {
  const sidebarPath = path.join(projectRoot, "commands/vocs/sidebar/cast-cli-reference.ts");
  const content = await fs.promises.readFile(sidebarPath, "utf-8");
  
  // Extract the exported object using regex (simple approach)
  // In production, you might want to use a proper TypeScript parser
  const match = content.match(/export const castCliReference: SidebarItem = (\{[\s\S]*\});/);
  if (!match) {
    throw new Error("Could not parse sidebar file");
  }
  
  // Evaluate the object (be careful with eval in production!)
  // For a production system, use a proper TypeScript parser like @typescript-eslint/parser
  const sidebarObj = eval(`(${match[1]})`);
  return sidebarObj;
}

// Extract all commands from the sidebar structure
function extractCommands(item: SidebarItem, category: string = ""): Command[] {
  const commands: Command[] = [];
  
  if (item.link && item.text.startsWith("cast ")) {
    // Convert link format: "/cast/reference/4byte" -> "cast-4byte"
    const pathMatch = item.link.match(/\/cast\/reference\/(.+)$/);
    if (pathMatch) {
      // Convert slashes to dashes for nested paths
      const commandPath = "cast-" + pathMatch[1].replace(/\//g, "-");
      commands.push({
        name: item.text,
        link: item.link,
        category: category,
        path: commandPath
      });
    }
  }
  
  if (item.items) {
    const currentCategory = item.text || category;
    for (const subItem of item.items) {
      commands.push(...extractCommands(subItem, currentCategory));
    }
  }
  
  return commands;
}

// Get existing pages
async function getExistingPages(): Promise<Set<string>> {
  const commandsDir = path.join(projectRoot, "app/(commands)");
  const entries = await fs.promises.readdir(commandsDir, { withFileTypes: true });
  
  const pages = new Set<string>();
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith("_") && entry.name !== "components") {
      pages.add(entry.name);
    }
  }
  
  return pages;
}

// Generate page content for a new command
function generatePageContent(command: Command): string {
  const commandName = command.path;
  
  return `import path from "path";
import { getPageContent } from "@/app/lib/getContent";
import { getMdxContent } from "@/app/lib/getMdxContent";
import { generateCommandMetadata } from "../components/CommandPageTemplate";
import { CommandPageTemplateWithCustomizations } from "../components/CommandPageTemplateWithCustomizations";

export const generateMetadata = () => generateCommandMetadata(import.meta.url);

export default async function CommandPage() {
  const dirName = path.basename(path.dirname(import.meta.url));
  // Try to get MDX content first, fall back to regular content if needed
  const mdxContent = await getMdxContent(\`\${dirName}.md\`);
  const content = mdxContent ? null : await getPageContent(\`\${dirName}.md\`);

  return (
    <CommandPageTemplateWithCustomizations
      commandPath={dirName}
      content={content}
      mdxContent={mdxContent}
    />
  );
}
`;
}

// Create a new page
async function createPage(command: Command): Promise<void> {
  const pageDir = path.join(projectRoot, "app/(commands)", command.path);
  const pagePath = path.join(pageDir, "page.tsx");
  
  // Create directory if it doesn't exist
  await fs.promises.mkdir(pageDir, { recursive: true });
  
  // Write the page file
  await fs.promises.writeFile(pagePath, generatePageContent(command));
  
  console.log(`Created page: ${command.path}`);
}

// Delete a page directory
async function deletePage(pageName: string): Promise<void> {
  const pageDir = path.join(projectRoot, "app/(commands)", pageName);
  
  try {
    await fs.promises.rm(pageDir, { recursive: true, force: true });
    console.log(`Deleted page: ${pageName}`);
  } catch (error) {
    console.error(`Error deleting page ${pageName}:`, error);
  }
}

// Generate navigation structure
function generateNavigationCategories(commands: Command[]): Map<string, Command[]> {
  const categories = new Map<string, Command[]>();
  
  for (const command of commands) {
    if (!categories.has(command.category)) {
      categories.set(command.category, []);
    }
    categories.get(command.category)!.push(command);
  }
  
  return categories;
}

// Main sync function
async function syncCommands() {
  console.log("Starting command sync...");
  
  try {
    // Parse sidebar to get all commands
    const sidebar = await parseSidebarFile();
    const commands = extractCommands(sidebar);
    console.log(`Found ${commands.length} commands in sidebar`);
    
    // Get existing pages
    const existingPages = await getExistingPages();
    console.log(`Found ${existingPages.size} existing pages`);
    
    // Find commands that need pages
    const commandPaths = new Set(commands.map(cmd => cmd.path));
    const pagesToCreate = commands.filter(cmd => !existingPages.has(cmd.path));
    const pagesToDelete = Array.from(existingPages).filter(page => 
      !commandPaths.has(page) && page !== "cast" // Keep the main cast page
    );
    
    // Create missing pages
    for (const command of pagesToCreate) {
      await createPage(command);
    }
    
    // Delete orphaned pages
    for (const page of pagesToDelete) {
      await deletePage(page);
    }
    
    // Generate navigation file
    await generateNavigationFile(commands);
    
    console.log("\nSync completed!");
    console.log(`- Created ${pagesToCreate.length} new pages`);
    console.log(`- Deleted ${pagesToDelete.length} orphaned pages`);
    
  } catch (error) {
    console.error("Error during sync:", error);
    process.exit(1);
  }
}

// Generate the navigation data file
async function generateNavigationFile(commands: Command[]) {
  const categories = generateNavigationCategories(commands);
  
  // Sort categories in the same order as the sidebar
  const categoryOrder = [
    "ABI Commands",
    "Account Commands", 
    "Block Commands",
    "Chain Commands",
    "Conversion Commands",
    "ENS Commands",
    "Etherscan Commands",
    "General Commands",
    "Transaction Commands",
    "Utility Commands",
    "Wallet Commands"
  ];
  
  // Generate the navigation data
  const navigationData: any = {
    categories: {}
  };
  
  for (const category of categoryOrder) {
    const categoryCommands = categories.get(category);
    if (categoryCommands) {
      navigationData.categories[category] = categoryCommands.map(cmd => ({
        text: cmd.name,
        href: `/${cmd.path}`
      }));
    }
  }
  
  // Write navigation data file
  const navigationDataPath = path.join(projectRoot, "app/lib/navigation-data.json");
  await fs.promises.writeFile(
    navigationDataPath,
    JSON.stringify(navigationData, null, 2)
  );
  
  console.log("Generated navigation data file");
}

// Run the sync
syncCommands();