import assert from "node:assert/strict";
import test from "node:test";
import { applySecurityOverrides } from "./apply-commands-security.mjs";

test("daily imports preserve upstream overrides and release-age settings", () => {
  const original = 'catalog:\n  vite: 1.3.0\noverrides:\n  vite@*: "catalog:"\nminimumReleaseAge: 1440\n';
  const updated = applySecurityOverrides(original, { "toml@<5.0.1": "5.0.1" });
  assert.ok(updated.includes('  "toml@<5.0.1": "5.0.1"\n'));
  assert.ok(updated.includes('  vite@*: "catalog:"\nminimumReleaseAge: 1440\n'));
  assert.equal(applySecurityOverrides(updated, { "toml@<5.0.1": "5.0.1" }), updated);
});

test("a revised security policy replaces the previous policy", () => {
  const initial = applySecurityOverrides("packages:\n  - perf\n", { "toml@<5.0.1": "5.0.1" });
  const revised = applySecurityOverrides(initial, { "zod@>=4 <4.6.6": "4.6.6" });
  assert.ok(!revised.includes("toml@"));
  assert.ok(revised.includes('  "zod@>=4 <4.6.6": "4.6.6"'));
  assert.equal(revised.match(/^overrides:/gm).length, 1);
});

test("unexpected upstream formats fail instead of discarding configuration", () => {
  assert.throws(() => applySecurityOverrides("overrides: {vite: 1.3.0}\n", {}));
  assert.throws(() => applySecurityOverrides("overrides:\n  # BEGIN QuickCast security overrides\n", {}));
});
