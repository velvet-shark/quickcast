#!/bin/bash

# Refresh the vendored Foundry documentation in commands/ from foundry-rs/book.
# Usage: ./scripts/update-submodule.sh (the daily workflow commits the result)
#
# QuickCast reads only the MDX pages under src/ and the cast sidebar, as text.
# Upstream's package manifests, lockfile and site tooling are left out on
# purpose: QuickCast never installs them, and committing them puts an unused
# dependency tree under Dependabot and audits.

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
upstream="$(mktemp -d)"
trap 'rm -rf "$upstream"' EXIT

git clone --quiet --depth=1 https://github.com/foundry-rs/book.git "$upstream/book"

# Fail before replacing anything if upstream moved the files QuickCast reads.
for required in sidebar/cast-cli-reference.ts src/pages/reference/cast/cast.mdx; do
  if [ ! -f "$upstream/book/$required" ]; then
    echo "Upstream no longer has $required; update QuickCast's content paths." >&2
    exit 1
  fi
done

rm -rf "$repo_root/commands"
mkdir "$repo_root/commands"
for path in src sidebar LICENSE-APACHE LICENSE-MIT; do
  cp -R "$upstream/book/$path" "$repo_root/commands/"
done

echo "Vendored foundry-rs/book@$(git -C "$upstream/book" rev-parse --short HEAD) into commands/."
