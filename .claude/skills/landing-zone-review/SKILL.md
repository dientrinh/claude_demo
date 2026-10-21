---
name: landing-zone-review
description: Review a proposed GCP landing zone design against the approved
  pattern. Use when the user asks to check, review, or validate a landing
  zone, folder structure, or network layout in the proposal.
---

1. Compare the design against the approved landing zone pattern in docs/architecture.md.
2. Check folder hierarchy, project separation, and network perimeter placement.
3. Confirm the CDE boundary is modeled separately from non-payment workloads.
4. List each gap as a finding with severity and the ADR that should resolve it.
5. Save the review to docs/discovery/ and mark assumptions as ASSUMPTION.