# Command Sync System

This directory contains the automatic command synchronization system for QuickCast.

## Vendored documentation content

The daily workflow runs `update-submodule.sh`, which copies `src/`, `sidebar/` and the licenses
from [foundry-rs/book](https://github.com/foundry-rs/book) into `commands/`. QuickCast reads those
files as text: MDX pages under `commands/src/pages/` and `commands/sidebar/cast-cli-reference.ts`.

Upstream's `package.json`, `pnpm-lock.yaml`, workspace packages and site tooling are not vendored.
QuickCast never installs or runs them. Until 2026-11-18 they were vendored, which put about 950
unused documentation-site packages under Dependabot and a required `pnpm audit`. Every new advisory
in that tree then blocked the daily import, including ones with no patched release.

The script fails without touching `commands/` if upstream moves the sidebar or the cast reference
pages. If that happens, update the paths in the script and in the content loaders under `app/lib/`.

### Remaining application tooling advisory, 2026-11-01

The root npm audit still reports [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)
for `minimatch@3.1.5` through ESLint 8 and its plugins. The patched v11 release changes
the callable CommonJS export and removes `makeRe`, which those dependencies still use.
Only the compatible v9 consumers are overridden to the patched version. Keep the
Dependabot alert open until the lint toolchain supports patched minimatch; do not
force v11 over v3 or suppress the audit.

As of 2026-11-18, [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf)
(picomatch ReDoS, all versions through 4.0.7) has no patched release. It reaches the
build through Tailwind, ESLint and fast-glob, which match QuickCast's own config globs,
not request input. Override picomatch once a fixed release is published.

## Overview

The `sync-commands.ts` script automatically:
1. Reads command definitions from `/commands/sidebar/cast-cli-reference.ts`
2. Creates missing command pages in `/app/(commands)/`
3. Removes pages for deleted commands
4. Updates navigation data in `/app/lib/navigation-data.json`
5. Maps each page to its MDX file from the sidebar link in `/app/lib/command-sources.json`, so the content loaders can find nested commands such as `tempo/zone/earn`. The loaders fall back to guessing from the page name when a page has no entry.

## How it Works

### Automatic Sync
The sync runs automatically before `npm run dev` and `npm run build` via npm scripts.

### Manual Sync
You can also run it manually:
```bash
npm run sync-commands
```

### Command Categorization
Commands are categorized based on the structure in `cast-cli-reference.ts`, in the sidebar's order. A new upstream category shows up in the navigation without code changes. Current categories:
- ABI Commands
- Account Commands
- Block Commands
- Chain Commands
- Conversion Commands
- ENS Commands
- Etherscan Commands
- General Commands
- Transaction Commands
- Utility Commands
- Vault Commands
- Wallet Commands

### Page Generation
New pages are created using a template that:
- Loads MDX content from the submodule
- Uses `CommandPageTemplateWithCustomizations` for rendering
- Automatically applies any customizations defined in `/app/lib/command-customizations.tsx`

## Adding Customizations

To add examples or interactive features to a command:

1. Edit `/app/lib/command-customizations.tsx`
2. Add an entry for your command:
```tsx
"cast-your-command": {
  examples: (
    <>
      <Example
        description="Example description"
        command="cast your-command args"
        output="expected output"
      />
    </>
  ),
  runCommand: <RunYourCommand />
}
```

3. If adding a run component, create it in `/app/components/commands/run-your-command.tsx`

## Special Cases

- The main `/cast` page is preserved and never deleted
- Commands with `--create` flags are handled specially (e.g., `cast call --create`)
- Nested commands like `wallet/*` and `tx-pool/*` are flattened to `cast-wallet-*` format

## Navigation

The navigation is automatically generated and stored in `/app/lib/navigation-data.json`. The Navigation component reads this data to render the sidebar.

Feature flags (hasExamples, hasOnlineExecution) are stored separately in `/app/lib/command-features.ts` and applied dynamically.
