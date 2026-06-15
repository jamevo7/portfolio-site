#!/usr/bin/env bash
# Create a portfolio worktree the conflict-free way:
#   ./scripts/new-worktree.sh <feature-name> [base-branch]
# e.g. ./scripts/new-worktree.sh hero
#
# - branch:   feat/<feature-name>
# - folder:   ../portfolio-<feature-name>  (sibling of this repo)
# - copies every path in .worktreeinclude (e.g. .env) into the new worktree
# - runs `npm install` there (node_modules is not shared between worktrees)
set -euo pipefail

feature="${1:?usage: new-worktree.sh <feature-name> [base-branch]}"
base="${2:-main}"

root="$(git rev-parse --show-toplevel)"
dest="$root/../portfolio-$feature"
branch="feat/$feature"

git -C "$root" worktree add -b "$branch" "$dest" "$base"

if [ -f "$root/.worktreeinclude" ]; then
  while IFS= read -r path; do
    case "$path" in ""|\#*) continue ;; esac
    if [ -e "$root/$path" ]; then
      cp -R "$root/$path" "$dest/$path"
      echo "copied $path"
    fi
  done < "$root/.worktreeinclude"
fi

( cd "$dest" && npm install )
echo "ready: $dest  (branch $branch)"
