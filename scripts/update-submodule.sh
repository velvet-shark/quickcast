#!/bin/bash

# Script to update the commands submodule and commit changes
# Usage: ./scripts/update-submodule.sh

set -e

echo "Updating commands submodule..."

# Navigate to submodule directory
cd commands

# Fetch latest changes
git fetch origin

# Check if there are updates
CURRENT_HASH=$(git rev-parse HEAD)
LATEST_HASH=$(git rev-parse origin/main)

if [ "$CURRENT_HASH" = "$LATEST_HASH" ]; then
    echo "Commands submodule is already up to date."
    exit 0
fi

# Update to latest
git reset --hard origin/main

# Go back to project root
cd ..

# Add and commit the submodule update
git add commands
git commit -m "Update commands submodule to latest ($(cd commands && git rev-parse --short HEAD))"

echo "Submodule updated and committed successfully!"
echo "New commit: $(cd commands && git rev-parse --short HEAD)"
