---
name: legacy-workload-assessment
description: Assess a legacy COBOL/Oracle workload for GCP migration.
  Use when the user asks to inventory, classify, or score legacy systems
  for migration waves.
---

1. Inventory batch jobs, interfaces, and data stores from the source files.
2. Classify each workload: rehost, replatform, refactor, or retire.
3. Score dependencies and data sensitivity (PCI, PII, SOX-relevant).
4. Output a wave plan as a markdown table with risk ratings, saved to
   docs/discovery/.