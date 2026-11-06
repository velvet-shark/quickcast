# QuickCast

QuickCast.dev is a Next.js 15 and React 19 reference site for Foundry `cast` commands, with interactive execution where supported.

## Commands

- `npm install`: install dependencies.
- `npm run dev`: sync vendored command content, then start local development.
- `npm run build`: sync command content, then build production output.
- `npm run lint`: run the configured Next.js lint command.
- `npm run sync-commands`: regenerate local command content from the vendored source.
- `npm run update-submodule`: update the documentation submodule through the repository script.

## Architecture and boundaries

- Routes live under `app/(commands)/<command>/page.tsx`; shared command UI lives under `app/components/commands/`.
- Command pages use the existing `CommandPageTemplate`, `generateCommandMetadata`, and MDX/content loaders. Copy a neighboring page pattern instead of creating a new page architecture.
- Documentation originates from the vendored `commands` submodule and is synchronized into the app. Do not edit submodule content directly; source documentation changes belong upstream.
- MDX imports are resolved recursively by `getMdxContent()` with `getPageContent()` as the simple-content fallback.
- Interactive command components are client components and must be registered in `commandFeatures` using the existing lazy component pattern.

## Product rules

- Keep the site mobile-first, accessible, and approachable for developers new to Foundry.
- The product currently uses the light theme only; do not introduce dark-mode work without an explicit product request.
- No automated test suite is configured. For changes, run the relevant lint and production build plus a focused browser check of affected command pages.
