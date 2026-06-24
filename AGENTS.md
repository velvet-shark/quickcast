# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

QuickCast.dev is an interactive documentation and web tool platform for Foundry's `cast` command-line utilities. It provides comprehensive documentation with real-world examples and browser-based execution for supported commands.

## Development Commands

```bash
npm install          # Install dependencies
npm run dev         # Start development server (http://localhost:3000)
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
```

## Architecture

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **UI**: React 18.3, Shadcn/ui, Radix UI
- **Styling**: Tailwind CSS (mobile-first)
- **Key Libraries**: ethers.js v6, react-markdown, react-syntax-highlighter

### Project Structure
```
app/
├── (commands)/          # Individual cast command pages
│   └── [command]/      # e.g., cast-to-bytes32, cast-abi-encode
├── components/         
│   ├── commands/       # Command-specific interactive components
│   └── ui/            # Shared UI components
└── lib/               # Utilities (getContent.ts, utils.ts)
```

### Key Patterns

1. **Command Pages**: Each command follows this pattern in `/app/(commands)/[command-name]/page.tsx`:
   ```typescript
   export const metadata = generateCommandMetadata(import.meta.url);
   
   export default async function CommandPage() {
     const dirName = path.basename(path.dirname(import.meta.url));
     // Try to get MDX content first, fall back to regular content if needed
     const mdxContent = await getMdxContent(`${dirName}.md`);
     const content = mdxContent ? null : await getPageContent(`${dirName}.md`);
     
     return <CommandPageTemplate 
       content={content}
       mdxContent={mdxContent}
       examples={examples} // optional
       runCommand={<RunCommand />} // optional
     />;
   }
   ```

2. **Adding Interactive Features**:
   - Create component in `/app/components/commands/run-[command].tsx`
   - Must be a client component (`"use client"`)
   - Update `commandFeatures` in `/app/components/Navigation.tsx`:
     ```typescript
     "command-name": {
       onlineExecution: true,
       component: () => <RunCommandName />
     }
     ```

3. **Documentation Content**:
   - Pulled from vendored repo: `/commands/src/pages/reference/cast/[command].mdx`
   - MDX files may contain imports at the beginning (e.g., `import RpcOptions from "./rpc-options.mdx"`)
   - Loaded by `getMdxContent()` which:
     - Parses and resolves MDX imports
     - Loads imported components recursively
     - Returns structured data with content and components
   - Falls back to `getPageContent()` for simple content without imports
   - Do NOT modify submodule files directly

### Development Guidelines

1. **Code Style** (from .cursorrules):
   - Use functional components only
   - Prefer React Server Components (minimize `"use client"`)
   - Use TypeScript interfaces over types
   - Follow functional/declarative patterns
   - Use descriptive names with auxiliary verbs (isLoading, hasError)

2. **File Naming**:
   - Directories: lowercase-with-dashes
   - Components: PascalCase.tsx
   - Utilities: camelCase.ts

3. **Component Structure**:
   ```typescript
   // 1. Imports
   // 2. Types/interfaces
   // 3. Exported component
   // 4. Subcomponents
   // 5. Helper functions
   // 6. Static content
   ```

## Common Tasks

### Adding a New Command Page
1. Create `/app/(commands)/cast-[command-name]/page.tsx`
2. Use the standard template pattern (see existing commands)
3. Ensure corresponding documentation exists in submodule

### Adding Interactive Execution
1. Create `/app/components/commands/run-[command].tsx` as client component
2. Add to `commandFeatures` in Navigation.tsx
3. Follow existing patterns (e.g., RunBytes32, RunToDec)

### Updating Documentation
- The `commands` directory is a git submodule
- To update: `cd commands && git pull origin main`
- Documentation changes should be made in the foundry-rs/book repository

## Important Notes

- No automated tests are configured
- Use default light theme only (no dark mode)
- Mobile-first responsive design is required
- Analytics are tracked via Plausible
- Focus on accessibility and ease of use for developers new to Foundry
- MDX support: Documentation files use MDX format with component imports
- Use `getMdxContent()` for loading documentation with imports
- MDX components are rendered using `next-mdx-remote`