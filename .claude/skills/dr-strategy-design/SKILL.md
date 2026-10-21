---
name: dr-strategy-design
description: Design a disaster recovery strategy with RTO and RPO targets for
  the migrated banking platform. Use when the user asks about failover, recovery
  objectives, or resilience tiers.
---

1. Group workloads into failover tiers based on business criticality.
2. Propose RTO and RPO targets per tier and mark them as ASSUMPTION until the client confirms.
3. Describe the recovery pattern for each tier (for example, warm standby or backup and restore).
4. Record the trade-offs in an ADR in docs/decisions/.

This skill produces a recovery strategy, not an operational runbook.