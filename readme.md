# Bank Migration Proposal

## Context
Proposal for migrating a legacy core banking platform (COBOL on mainframe,
Oracle DB, batch-driven) to GCP. Client regulators require data residency
in the approved region and full audit trails.

## Standards
- All infrastructure is Terraform. Never use the console for persistent resources.
- Resource names follow `{env}-{service}-{region}-{nnn}`.
- Every proposal diagram must reference the approved landing zone pattern.
- Do not include real customer data, account numbers, or PANs in any file.

## Architecture reference
@docs/architecture.md

## General Guidelines

| Level        | Location                | Purpose                                       |
|--------------|-------------------------|-----------------------------------------------|
| User         | `~/.claude/CLAUDE.md`   | Your personal preferences across all projects |
| Project      | `./CLAUDE.md`           | Shared team context, committed to git         |
| Local        | `./CLAUDE.local.md`     | Your private overrides, gitignored            |
| Subdirectory | `./terraform/CLAUDE.md` | Loaded when Claude works in that folder       |

