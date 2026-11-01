import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const begin = "  # BEGIN QuickCast security overrides";
const end = "  # END QuickCast security overrides";

// Keep upstream's configuration and newer fixed versions when the daily import runs.
export function applySecurityOverrides(workspace, overrides) {
  const start = workspace.indexOf(`${begin}\n`);
  if (start !== -1) {
    const finish = workspace.indexOf(`${end}\n`, start);
    if (finish === -1) throw new Error("Unterminated QuickCast security overrides");
    workspace = workspace.slice(0, start) + workspace.slice(finish + end.length + 1);
  }

  const entries = Object.entries(overrides)
    .map(([selector, version]) => `  ${JSON.stringify(selector)}: ${JSON.stringify(version)}\n`)
    .join("");
  const block = `${begin}\n${entries}${end}\n`;
  if (/^overrides:[ \t]*\r?\n/m.test(workspace)) {
    return workspace.replace(/^(overrides:[ \t]*\r?\n)/m, `$1${block}`);
  }
  if (/^overrides:/m.test(workspace)) {
    throw new Error("Unsupported upstream overrides format; review before updating");
  }
  return `${workspace.trimEnd()}\n\noverrides:\n${block}`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = new URL("commands-security-overrides.json", import.meta.url);
  const workspace = new URL("../commands/pnpm-workspace.yaml", import.meta.url);
  const overrides = JSON.parse(readFileSync(config, "utf8"));
  writeFileSync(workspace, applySecurityOverrides(readFileSync(workspace, "utf8"), overrides));
  console.log("Applied QuickCast security overrides to the vendored documentation tooling.");
}
