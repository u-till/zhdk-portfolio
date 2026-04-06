---
name: Use git add . instead of listing files
description: Prefer git add . over explicit file lists when .gitignore is present
type: feedback
---

Use `git add .` instead of listing files individually when staging. The `.gitignore` already handles excluding sensitive/unwanted files, so listing files explicitly is redundant and risks forgetting a file.

**Why:** Listing files is more error-prone (can miss files) and unnecessary when `.gitignore` is properly configured.
**How to apply:** Default to `git add .` unless there's a specific reason to exclude tracked files from a commit.
