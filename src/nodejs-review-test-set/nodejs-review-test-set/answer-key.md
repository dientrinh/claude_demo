# Answer Key

| ID  | Issue                                                      | Category              | Flag? | Severity |
|-----|------------------------------------------------------------|-----------------------|-------|----------|
| S01 | SQL built by string concatenation from `name`              | Security              | Yes   | critical |
| S02 | JWT signing secret hardcoded in source                     | Security              | Yes   | critical |
| S03 | `Map.get` can return undefined, then `customer.email`      | Bug                   | Yes   | high     |
| S04 | Loop bound `length - 1` skips the last item                | Bug                   | Yes   | high     |
| S05 | Comment says sorted by price; code never sorts             | Comment contradiction | Yes   | low      |
| S06 | Accurate comment; code filters and sorts                   | Accurate comment      | No    | n/a      |
| S07 | Quotes, `var`, semicolons, spacing, naming                 | Style                 | No    | n/a      |
| S08 | AppLog wrapper (documented convention)                     | Local pattern         | No    | n/a      |
| S09 | DELETE route lacks `requireRole` unlike GET route          | Security              | Yes   | critical |
| S10 | File handle never closed                                   | Bug (resource leak)   | Yes   | high     |
| S11 | Terse "calc" comment, not contradictory                    | Terse comment         | No    | n/a      |
| S12 | Comment says 3 retries; loop runs 5 attempts               | Comment contradiction | Yes   | low      |
| S13 | Empty array gives `0 / 0 = NaN`                            | Bug (edge case)       | Yes   | medium   |
| S14 | Catch-all returning `Result.failure` (convention)          | Local pattern         | No    | n/a      |
| S15 | `assertCanRead` implementation not visible                 | Speculative           | No    | n/a      |

Totals: 9 should be flagged (S01, S02, S03, S04, S05, S09, S10, S12, S13) and 6 should not (S06, S07, S08, S11, S14, S15).

Severity boundary pair to use as examples: S03 (fails in normal use when the id is not cached: high) vs S13 (fails only on an empty array: medium).
