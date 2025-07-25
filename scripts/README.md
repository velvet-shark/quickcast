# Command Sync System

This directory contains the automatic command synchronization system for QuickCast.

## Overview

The `sync-commands.ts` script automatically:
1. Reads command definitions from `/commands/vocs/sidebar/cast-cli-reference.ts`
2. Creates missing command pages in `/app/(commands)/`
3. Removes pages for deleted commands
4. Updates navigation data in `/app/lib/navigation-data.json`

## How it Works

### Automatic Sync
The sync runs automatically before `npm run dev` and `npm run build` via npm scripts.

### Manual Sync
You can also run it manually:
```bash
npm run sync-commands
```

### Command Categorization
Commands are categorized based on the structure in `cast-cli-reference.ts`:
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